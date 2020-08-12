---
title: "개츠비 블로그 구글 네이버 다음 검색 노출시키기"
path: "posts/2020-gatsby-blog-seo"
tags: ["gatsby","crawler"]
featuredImage: "./cover.jpg"
excerpt: 개츠비 블로그 SEO(Search Engine Optimization) 적용. 구글 서치 콘솔(GSC:Google Search Console) 및 네이버 웹마스터 도구 등록
created: 2020-08-11
updated: 2020-08-12
---

## 검색엔진 최적화 (SEO)
- 첫 포스트를 올리고 드디어 구글 검색이 되도록 하기 위해서 정보를 모으고 구현을 완료했다. 그 과정에서 겪은 삽질의 기록을 적어봤다.
- SEO (Search Engine Optimization)란 웹사이트가 검색이 잘 되도록 하는 일련의 작업을 의미한다고 함. 기술적으로나 마케팅적으로나 전문 분야이기 때문에 지금은 사전적 의미만 파악하고 넘어가기로 했다.

## sitemap.xml 생성
- 1차적으로 타겟팅하는 검색엔진은 구글이고, 구글에 검색이 잘 되게 하기 위해선 웹 크롤러가 우리 블로그를 찾아와 크롤링을 잘 할 수 있도록 이정표를 만들어줘야 한다. 이 때, sitemap.xml이 이정표 역할을 한다고 한다.
- 개츠비 블로그는 사이트맵을 자동 생성해주는 플러그인을 제공하고 있어서 간단하게 이정표를 세울 수 있다.
- 우선, **gatsby-config.js** 내 플러그인을 추가한다.

```
  plugins: [
     ...
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    ...
  ]
```

- 개츠비 사이트맵 플러그인을 설치하고 사이트맵을 자동생성 해준다.

```
yarn add gatsby-plugin-sitemap
gatsby develop
```

- <http://localhost:8000/sitemap.xml> 접속하여 자동생성된 내용을 확인한다. 다음과 같은 형식의 문서가 나타난다면 성공
  
```
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url>
<loc>https://dyjh-blog.netlify.app/posts/2020-gatsby-blog-seo</loc>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
...
</urlset>
```

## 구글 서치 콘솔(GSC:Google Search Console) 등록
- 구글 서치 콘솔 <https://search.google.com/search-console/about?hl=ko> 접속하여 구글 아이디로 로그인한다.
- 우측에 **URL 접두어**를 선택하고 인증용 html 파일을 다운로드 한다.
- 해당 html을 프로젝트 폴더 내에 복사하고 **package.json build 스크립트를 수정**하여 빌드 완료 후 public/ 폴더로 복사하게 한다

```
"scripts": {
    "build": "... && gatsby build && cp content/pages/google....html public/",
    ...
  },
```

- 다음 빌드 시 http://localhost:9000/....html 접속하여 인증용 html 내용이 잘 뜨는지 확인한다.

```
yarn build
gatsby serve
```

- 커밋 후 다음 netlify 빌드가 완료되면 https://....netlify.app/....html 로 접속하여 인증용 html 내용이 잘 뜨는지 확인하고, 구글 서치콘솔로 돌아와서 **인증을 완료**한다.

- 좌측 sitemaps 메뉴내에 빈칸에 sitemap.xml 입력하고 제출한다. 간헐적으로 별다른 에러메시지 없이 실패가 뜨는 알려진 버그가 있다고 한다. 하루정도 기다리면 해결이 되는듯 하다.
- 몇 시간 정도 후에, 잘 적용되었는지 확인하기 위하여 구글 검색창에 내 웹사이트를 검색한다. ```site:....netlify.app```
- 사이트맵에 등록된 리스트가 올바르게 리스트업 된다면 성공

## GSC 몇 일 쓰면서 느낀 점
- 구글 검색의 업데이트 속도가 상당히 느리다. 최소 하루는 기다려야 새로운 페이지를 인식하는 듯하다.
- URL 경로의 변경은 최대한 지양하자. 한 번 잘 못 등록된 URL이 검색 결과에서 내려가질 않아 404 오류가 뜨는 문제가 있다.

## 네이버 검색 노출 시키기
- 네이버 역시 GSC와 유사한 Search Advisor (웹 마스터 도구)를 제공한다. 등록 방법도 구글과 매우 유사하기 때문에 어렵지 않게 등록할 수 있다.
- 네이버 웹 마스터 도구 <https://searchadvisor.naver.com/tools/sitecheck>에 접속하여 간단체크를 통해 블로그의 SEO 상태를 확인할 수 있다. (10회 한정) 결과를 보면 robots.txt 가 등록 안 되어 있는 것을 확인할 수 있다. robots.txt 역시 sitemap.xml 처럼 크롤러가 동작하기 위한 문서로 작성해주는 것이 좋다.

## robots.txt 작성하기
- 개츠비 robots.txt 작성 플러그인을 설치한다. ```yarn add gatsby-plugin-robots-txt```
- **gatsby-config.js**에 플러그인을 등록하고 모든 크롤러에 대해 모든 URL을 오픈하도록 robots.txt 설정해준다. 제외하고 싶은 URL이 있다면 disallow 속성을 추가한다.

```
  plugins: [
...
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://dyjh-blog.netlify.app',
        sitemap: 'https://dyjh-blog.netlify.app/sitemap.xml',
        policy: [{
          userAgent: '*',
          allow: '/'
        }]
      }
    },
...
  ]
```

- ```yarn build``` 및 ```gatsby serve``` 후 <http://localhost:8000/robots.txt> 접속이 잘 된다면 성공. 커밋 후 반영한다.

## 네이버 웹 마스터에 사이트 등록
- 네이버 웹 마스터 내에 사이트 관리 메뉴 <https://searchadvisor.naver.com/console/board>에 접속하여 로그인 후 사이트를 등록한다. 웹 사이트 인증은 구글과 비슷한 방식으로 진행하면 된다.
- 좌측 **사이트맵 제출** 클릭 후 sitemap.xml URL을 입력한다.
- 목록에서 사이트 명을 클릭하여 관리 페이지로 접속한 후, **검증 -> robots.txt** 메뉴에서 **robots.txt 검증 및 수집요청**을 한다.
- **설정 -> 수집 주기 설정**을 **빠르게**로 설정한다. 수집제한 설정하지 않음이 체크되어 있음을 확인한다.
- 좌측 메뉴에서 **웹 페이지 최적화**로 사이트 루트 페이지를 체크해보면 robots.txt가 올바르게 등록되었음을 확인할 수 있다.
- 필요시 웹 페이지 수집과 웹 페이지 검색 제외를 진행한다.
- 일정 시간이 경과한 후 네이버 검색창에 ```site:{내 블로그 도메인}```을 검색하여 등록 여부를 확인한다. 검색결과가 없을 시, 최대 1주일 정도 기다려보라는 이야기가 있다.

## 다음 검색 노출시키기
- 다음 같은 경우 크롤러와 무관하게 웹사이트 정보를 직접 작성하여 신청하는 방식이다. 다음 검색등록 페이지<https://register.search.daum.net/index.daum>에 접속하여 블로그를 등록해주면 되는데, 특별히 어려운 기술은 필요 없으므로 자세한 설명은 생략한다.

## 다음 글
- 개츠비 블로그 댓글 기능 넣기 : <https://dyjh-blog.netlify.app/posts/2020-gatsby-blog-disqus>