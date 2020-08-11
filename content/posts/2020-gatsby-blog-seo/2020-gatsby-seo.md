---
title: "개츠비 블로그 구글 검색 되도록 하기"
path: "posts/2020-gatsby-blog-seo"
tags: ["gatsby","crawler"]
featuredImage: "./cover.jpg"
excerpt: 개츠비 블로그에 SEO(Search Engine Optimization) 적용. GSC (Google Search Console) 인증 및 sitemap.xml 등록.
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

## GSC (Google Search Console) 등록
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

## 다음 글
- 개츠비 블로그 댓글창 만들기
- 블로그 이용 통계 보기