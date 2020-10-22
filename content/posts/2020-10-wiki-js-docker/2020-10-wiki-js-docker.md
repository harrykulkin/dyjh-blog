---
title: "도커(docker)를 활용하여 위키(wiki.js) 구축 한방에 끝내기"
path: "/posts/2020-10-wiki-js-docker"
tags: ["wiki","docker"]
featuredImage: "./cover.jpg"
excerpt: docker-compose를 활용하여 마크다운(markdown) 기반 위키 손쉽게 구축하고 SSL 적용하기.
created: 2020-10-21
updated: 2020-10-21
---

## 시작하며
최근 사이트 구축 요청이 있었는데, 최근 회사에서 출판한 A라는 간행물을 손쉽게 검색하게 해달라는 것이었다. 유사 사례 중에 유명한 시스템은 법령정보 사이트가 있을 진데, 단행본 하나의 규모로 도입하기엔 볼륨이 너무 큰 것 같았다. 어떻게 하는 것이 현명한 선택일까?

## 워드프레스? docsify? gitbook?
처음에 거론된 것은 **워드프레스(wordpree)** 같은 블로그 라이브러리 였으나, UI가 정보전달에 적합하지 않아 탈락했다. 정적 텍스트 웹사이트 툴인 **docsify**가 있는데 검색 시 한글을 지원하지 않았다. 그와 유사한 **gitbook**도 검토해봤는데, 공식 docker 이미지가 없고 cli 등 별도의 개발환경을 설치해야 돼서 포기했다. 그러던 중 **wiki.js**라는 라이브러리를 알게 되고 방향을 위키 쪽으로 잡게 됐다.

## wiki.js
위키피디아에서 쓰는 미디어위키 같이 강력하진 않지만, 가볍고 기본 기능을 대부분 지원한다는 장점이 있다. 소규모 프로젝트에 적합하다.
### 특징
- vue.js, node.js 기반
- 오픈소스(GNU)
- 공식 docker 이미지 지원
- 한글 언어팩 및 한글 검색 지원
- 마크다운(Markdown) 및 위지위그(WYSIWYG) 에디터 지원
- 크롬/엣지 및 모바일 브라우저 지원
- IE 미지원

## 설치방법
### 가. 프록시와 독립 구성
wiki.js 이미지 단독으로 80(http) 포트와 3000 포트 접속은 기본적으로 가능하기 때문에 프록시 서버와 독릭적으로 구성 가능하다. 예를 들어, 별도의 nginx 프록시 서버가 DMZ 망에 있고, 해당 서버를 통해 내부 서버팜의 위키 서버로 접속하는 형태라면, 이 방법이 적합하다.

1. docker 및 docker-compose 설치
2. docker-compose.yml 작성
```
version: "3"
services:

  db:
    image: postgres:11-alpine
    environment:
      POSTGRES_DB: wiki
      POSTGRES_PASSWORD: wikijsrocks
      POSTGRES_USER: wikijs
    logging:
      driver: "none"
    restart: unless-stopped
    volumes:
      - db-data:/var/lib/postgresql/data

  wiki:
    image: requarks/wiki:2
    depends_on:
      - db
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: wikijs
      DB_PASS: wikijsrocks
      DB_NAME: wiki
    restart: unless-stopped
    ports:
      - "80:3000"

volumes:
  db-data:
```
3. ```sudo docker-compose up -d``` 실행

이제 웹 브라우저에서 해당 서버로 다이렉트로 접속하여, 기본 설정이 가능하다. 프록시 서버 설정이 필요하면 별도로 해줘야 한다.

### 나. 프록시 서버와 통합 구성 (SSL 구성 포함)
wiki 서버와 nginx 서버가 하나의 동일한 서버라면 아래와 같이 구성할 수 있다. 특히, 단독 서버에서 SSL 구성할 때 편한 방법이다.

1. docker 및 docker-compose 설치
2. SSL 인증서 발급
3. docker-compose.yml 작성
```
version: "3"
services:

  db:
    image: postgres:11-alpine
    environment:
      POSTGRES_DB: wiki
      POSTGRES_PASSWORD: wikijsrocks
      POSTGRES_USER: wikijs
    logging:
      driver: "none"
    restart: unless-stopped
    volumes:
      - db-data:/var/lib/postgresql/data

  wiki:
    image: requarks/wiki:2
    depends_on:
      - db
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: wikijs
      DB_PASS: wikijsrocks
      DB_NAME: wiki
    restart: unless-stopped
    ports:
      - "3000:3000"

  reverse:
    container_name: reverse
    hostname: reverse
    image: nginx
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
    volumes:
      - /path/to/conf:/etc/nginx/ # nginx.conf 파일 위치
      - /path/to/crt:/etc/ssl/private # SSL 인증서 위치

volumes:
  db-data:
```
4. ```/path/to/conf/dhparams.pem``` 파일 생성 : ```openssl dhparam -out dhparams.pem 4096```
5. ```/path/to/conf/nginx.conf``` 파일 작성
```
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
    worker_connections  1024;
}
http {
    #include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    upstream wiki-js {
        server wiki:3000;
    }

    server {
        listen        80;

        server_name   _;

        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        server_name <your-site-url>; # 웹사이트 주소 입력

        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto   $scheme;
        proxy_set_header    Host                $host;
        proxy_set_header    X-Forwarded-Host    $host;
        proxy_set_header    X-Forwarded-Port    $server_port;

        # SSL 설정
        ssl_protocols               TLSv1 TLSv1.1 TLSv1.2;
        ssl_ecdh_curve              secp384r1;
        ssl_ciphers                 "ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384 OLD_TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256 OLD_TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256";
        ssl_prefer_server_ciphers   on;
        ssl_dhparam                 /etc/nginx/dhparams.pem;
        ssl_certificate             /etc/ssl/private/ssl.crt;
        ssl_certificate_key         /etc/ssl/private/ssl.key;
        ssl_session_timeout         10m;
        ssl_session_cache           shared:SSL:10m;
        ssl_session_tickets         off;
        ssl_stapling                on;
        ssl_stapling_verify         on;

        location / {
            proxy_pass         http://wiki-js;
            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    keepalive_timeout  65;
    include /etc/nginx/conf.d/*.conf;
}
```
6. ```sudo docker-compose up -d``` 실행

이제 해당 웹사이트로 접속하면 SSL(443) 포트로 자동 리다이렉션 되면서, 암호화 통신이 가능하다.

## 초기 설정법
1. 최초 접속 시 admin 메일 계정을 지정한다. 한번 지정하면 바꿀 수 없다.
2. 아무 글이나 하나를 입력한다. 대충 저장하고 넘긴다.
3. 우측 상단에 톱니바퀴 모양의 **관리** 아이콘을 누르고 **언어** 설정에서 한국어를 다운받아 지정한다.
4. 메인페이지로 돌아가 한글(**ko**) 문서를 작성하고, 다시 관리 화면으로 돌아간다. (글 작성 시 markdown과 WYSIWYG 등 에디터 옵션이 다양한 것을 알 수 있다.)
5. **검색** 메뉴에서 엔진을 변경한다. 필자는 PostgreSQL을 선택하고 simple을 설정했다. 그리고 반드시 **구성 새로고침** 버튼을 눌러준다. (주기적으로 해주지 않으면, 검색 인덱스가 생성되지 않는듯 함)

## 목차(table of contents) 생성하는 법
WYSIWYG 에디터로 글 작성 시, 제목에 해당되는 줄을 선택하여, 좌측 상단 Paragraph를 눌러 Heading 스타일로 변경하면 된다.

markdown 작성 시에는 샾(#)을 이용해 제목을 지정해주면 된다.

제목을 여러 단계로 지정하면, 트리형태의 목차가 생성된다.

## 마치며...
wiki.js는 텍스트를 빠르게 올려서 공유하기에 최적화된 솔루션이다. 기타 위키 기능들은 아직 테스트가 더 필요하다. 아쉬운 점이 있다면, 한글 검색 시 단어가 아닌 어절 단위로 검색된다. 예를 들어, **가족**을 검색하면 **가족이**, **가족에게** 등은 검색이 되지 않는 식이다. 다행히 비슷한 어절을 추천 검색어로 제공하고 있어, 조금 불편하더라도 이용은 가능하다. 추후에 엘라스틱 서치(elastic search)에 형태소 분석기를 올려서 검색 엔진으로 설정하면 좋을 것 같다.

또한 IE11 에서 정상 작동이 안 된다. 소스를 내려받아서 package.json의 browserlist 설정값을 보면 그 이유를 알 수 있다. 그런데 이미 소스내에 babel 등 polyfill이 포함되어 있고, vue는 공식적으로 babel로 IE에 호환시킬 수 있는데도, IE를 배제시킨 것은 아쉽다. IE에서 기본적인 문서열람이라도 가능하게 하려면, **관리 → 메뉴**에서 **맞춤 탐색**을 선택하고 각 페이지의 링크를 직접 등록하면 된다.
```
  "browserslist": [
    "> 1%",
    "last 2 major versions",
    "Firefox ESR",
    "not ie > 0",
    "not ie_mob > 0",
    "not android > 0",
    "not dead"
  ],
```
