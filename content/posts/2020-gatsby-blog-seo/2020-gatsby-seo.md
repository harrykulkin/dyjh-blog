---
title: "개츠비 블로그 구글 검색에 뜨도록 하기"
path: "posts/2020-gatsby-blog-seo"
tags: ["개츠비블로그","웹크롤링"]
featuredImage: "./cover.jpg"
excerpt: 개츠비 블로그에 SEO(Search Engine Optimization) 적용. GSC (Google Search Console) 인증 및 sitemap.xml 등록.
created: 2020-08-11
updated: 2020-08-11
---

# 개츠비 블로그 구글 검색에 뜨도록 하기

## 검색엔진 최적화 (SEO)
- 첫 포스트를 올리고 드디어 구글 검색이 되도록 하기 위해서 정보를 모아보니, 좋은 글들이 많았다. 그 것들을 참고하여 겪은 삽질의 기록을 적어봤다.
- SEO (Search Engine Optimization)이란 웹사이트가 검색이 잘 되도록 하는 일련의 작업을 의미한다고 함. 기술적으로나 마케팅적으로나 전문 분야이기 때문에 더 깊게 들어가진 않기로 했다. 

## sitemap.xml 생성
- 1차적으로 타겟팅하는 검색엔진은 구글이고, 구글에 검색이 잘 되게 하기 위해선 웹 크롤러가 우리 블로그를 찾아와 크롤링할 수 있도록 이정표를 만들어줘야 함.
- sitemap.xml이 이정표 역할을 한다고 함
- 개츠비 사이트맵 플러그인을 이용해서 사이트맵을 자동생성해준다.

## GSC (Google Search Console) 등록
- 구글 서치 콘솔에 블로그를 인증한다.