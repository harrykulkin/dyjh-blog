---
title: "개츠비 블로그 댓글 기능 넣기"
path: "posts/2020-gatsby-blog-disqus"
tags: ["gatsby"]
featuredImage: "./cover.jpg"
excerpt: 개츠비 블로그에 disqus를 활용한 댓글 기능 넣기
created: 2020-08-12
updated: 2020-08-12
---

## disqus vs utterances vs 라이브리
- 검색 노출을 시켰으니, 이제 방문자들의 피드백을 받을 수 있는 댓글 기능이 필요하다. 대표적인 댓글 API 서비스들을 알아보고 비교하였다.
- 우선 disqus가 개츠비 블로그에서 가장 대중적으로 쓰이고 있었고, 플러그인도 잘 제공되는 편이었다. 구글, 페이스북, 트위터 등의 연동을 지원하지만, 한국 유저에게 친숙한 네이버나 카카오는 연동이 안 된다는 단점이 있다.
- 두번째로 살펴본 utterances는 깃헙 이슈 트래킹 기능을 기반으로 한 댓글 API 이다. 굉장히 가볍고 심플하고 참신한 아이디어로 출발했다는 점이 맘에 들지만, 깃헙 아이디가 없으면 댓글 작성이 힘들다는 단점이 있다.
- 세번째로 국내 서비스인 라이브리는 네이버, 카카오 등 국내 소셜 댓글 기능을 제공하는 서비스이다. 하지만 개츠비 플러그인이 없고, 개츠비에 적용한 레퍼런스를 찾기가 매우 힘들다.
- 세 가지 API를 놓고 고민한 결과 disqus가 현재로서는 도입이 무난할 것 같아 선택하게 됐다.

## disqus 등록 및 설치
- disqus를 이용하기 위해서 홈페이지<https://blog.disqus.com/>에서 우측상단 **Get Started**를 누르고 가입을 했다. 선택지에서는 하단의 **I want to install disqus on my site**를 선택했다.
- shortname과 Website URL을 입력하고 저장한다.
- 개츠비 블로그에 플러그인을 설치한다. ``` yarn add gatsby-plugin-disqus ```
-  **gatsby-config.js**에 플러그인을 추가하고 disqus에 등록한 shortname 을 입력해준다.

```
  plugins: [
...
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `dyjh-blog`
      }
    },
...
  ]
```

- 포스트 템플릿에 적용해준다. 아래는 src/gatsby-theme-nehalem/components/comments/**index.tsx**

```
import React, {FunctionComponent} from "react";
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

/**
 * Placeholder which is attached under every post. Can be shadowed to
 * quickly integrate comments (like commento, Disqus, ...).
 */
// @ts-ignore
const Comments: FunctionComponent<{ id: string }> = ({id}) => {
  let disqusConfig = {
    identifier: id,
  }
  return (
    <>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      <Disqus config={disqusConfig} />
    </>
)};

export default Comments;
```

- 내가 사용하는 nehalem 테마는 안타깝게도 셰도잉(shadowing) 기능이 올바르게 적용되지 않아서 **packge.json**을 수정하여 빌드 전에 소스를 바꿔치기 하는 방식을 선택했다. 테마를 바꿀까 진지하게 고민 중이다.

```
  "scripts": {
    "build": "... && cp src/gatsby-theme-nehalem/components/comments/index.tsx node_modules/@nehalist/gatsby-theme-nehalem/src/components/comments/ && ... && gatsby build && ...",
...
  },
```

- ```gatsby develop``` 으로 확인 후 잘 반영 됐다면 커밋해준다.

## 반영 후 고민
- 구글이나 페이스북 아이디를 지원해서 우리나라 사람들도 대부분 이용 가능할 것 같아서 다행이지만, 카카오와 네이버가 적용 안돼서 아쉽다. 라이브리를 개츠비에 도입하는 테스트를 했는데 쉽지않다. 타입스크립트나 리액트 공부가 좀 더 필요할 것 같다.

## 다음 글
- 개츠비 블로그 이용 통계 보기
- 개츠비 블로그 네이버 검색 노출시키기