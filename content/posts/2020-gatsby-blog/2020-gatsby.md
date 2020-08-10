---
title: "개츠비 스타터 블로그 생성기"
path: "/2020-gatsby-blog"
tags: ["개츠비블로그"]
featuredImage: "./cover.jpg"
excerpt: 개츠비 스타터 블로그 생성기
created: 2020-08-10
updated: 2020-08-10
---

# 개츠비 블로그 생성기

## 기술 블로그에 대한 동기부여 : 국민총삽질을 줄이자
- 평소에 기술 블로그를 검색하여 개발에 많은 도움을 받기만 했었는데, 최근 1년 간은 새로운 기술들을 공부하면서 우리나라 블로그에서는 찾기 힘든 정보를 구글링하는 사례가 많아졌다.
- 부족한 영어로 작업을 하다보니 자연스럽게 삽질하는 경우가 많아졌고 내가 삽질했던 바를 블로그에 공유하면 어떨까 하는 생각을 하게 됐다.
  - 적어도 나와 같은 길을 걷게될 누군가의 삽질을 줄여줄 수 있지 않을까... (**국민총삽질** 절감)
- 동기부여를 많이 준 블로그는 우아한형제들 등 기업형 기술 블로그
  - 업무를 하면서 깨달은 바나, 개선에 대한 아이디어를 실제 어떻게 활용했는지 기록하는 것이 인상 깊었음


## 컨텐츠 부족이라는 현실 : 가족 컨텐츠로 극복
- 하지만 당장 내가 생성한 컨텐츠 들은 회사 내부 공유용 문서 몇 장 정도 밖에 안돼서 컨텐츠 부족이라는 현실이 부딪히게 된다.
- 고민하던 중 집 컴퓨터를 뒤져보니 예전에 찍은 수 많은 **가족사진** 들이 있었다. 결국, 당장의 컨텐츠 부족이라는 벽을 가족 컨텐츠 및 취미 주제로 빠르게 채워나가는 방법을 택하게 된다.
- 미대 졸업 예정인 와이프에게 디자인 자문을 받고 **gatsby starter**로 뚝딱뚝딱 만들고 보여주니, 반응도 좋고 여러모로 보람찬 작업이었다.


## 마크다운 블로그 라이브러리 선택 : jekyll vs gatsby vs hugo
- 웹 개발이 본업이다 보니 딴에는 개발을 해볼까도 잠깐 고민했었으나, 이미 널리 쓰이고 있는 훌륭한 라이브러리를 사용하여 삽질을 줄이고 컨텐츠 생산에 열중하기로 했다.
- 특히, 깃헙에서도 많이 쓰는 **마크다운(markdown)** 기반의 블로그가 생산성이 높을 것 같아 마크다운 기반 블로그 라이브러리로 후보군을 한정지었다.
- 첫번째 후보는 **jekyll** 블로그를 였으나, 생소한 **ruby** 개발환경을 구성해야해서 탈락
- 또한 최근에 뛰어난 퍼포먼스로 급부샇안 **golang** 기반의 **hugo** 블로그도 있었다. 사내에서는 이미 golang 기반의 gitea를 깃헙 처럼 구축해서 쓰고 만족하고 있던 터라, 매우 긍정적으로 검토했으나,
- reddit 등의 반응을 찾아본 결과, **gatsby**가 비교적 대중적인 **reactJS** 기반으로도 충분한 퍼포먼스를 낸다는 평이 많아서 gatsby를 선택했다.

- 비교를 위해 **스택 셰어**를 많이 참조 했음을 알린다. <https://stackshare.io/stackups/gatsbyjs-vs-hugo-vs-jekyll>


## 배포 서비스 선택 : github.io vs netlify
- **github.io** 라는 무료 깃헙 배포 서비스가 첫번째 후보. 깃헙 아이디만 있으면 누구나 쉽게 배포 가능하다는 장점이 있다. jekyll 블로그 사용 시 연동도 잘된다.
- 하지만 gatsby를 쓰기로 해서 github.io 의 장점은 크게 느끼지 못했다. 더 큰 문제는 로컬 리포지토리에 git origin을 github.io 배포용 리포지토리로 설정을 해야되는데 그렇게할 경우 **원본 소스의 버전관리를 깃헙으로 하기 불편했다.**
- 구글링 결과 **netlify** 라는 대중적인 무료 배포 서비스가 성행하고 있었다. 큰 장점은 jenkins 등 CI 툴을 사용하는 것 처럼 배포 시 마다 자동으로 빌드할 수 있고 별도로 배포 디렉토리를 지정할 수 있었다.
  - 이 점만 보더라도 netlify를 선택할 이유는 충분했다.

## WSL2에서 gatsby 개발환경 만들기
- WSL2 환경에서 gatsby 개발환경을 구성하는 방법은 yarn을 이용하는 방법과 npm을 이용하는 방법으로 나뉜다. 필자는 yarn을 이용하는 방법으로 설명을 하겠다.
- yarn을 이용하더라도 npm은 필수적으로 설치해야 한다. yarn 을 통해 gatsby cli 를 전역(global) 로 설치하면 끝.
```
sudo apt-get install nodejs
sudo npm i -g yarn
sudo yarn global add gatsby-cli
gatsby -v
```

- 아래와 비슷한 결과가 나오면 성공이다
```
Gatsby CLI version: 2.12.76
```

## 마음에 드는 gatsby-starter 테마 고르기
- 여기서부터 기본 gatsby 템플릿을 생성하여 하나하나 만들어가는 방법도 있다. 하지만 이마저도 스킵하고 빠르게 컨텐츠를 양산하고 싶다면, 필자처럼 gatsby-starter 테마를 이용하면 된다.
- gatsby 공식 라이브로리 페이지에 검색하여 맘에드는 테마를 고른다 <https://www.gatsbyjs.org/starters/?c=Blog&v=2>
- 필자가 고민 끝에 선택한 테마 <https://www.gatsbyjs.org/starters/nehalist/gatsby-starter-nehalem/>
- 테마를 선택했다면 gatsby new 를 사용하여 로컬에 해당 테마를 다운로드 한다.
```
gatsby new {블로그명} https://www.gatsbyjs.org/starters/nehalist/gatsby-starter-nehalem
cd {블로그명}
```

- packge.json 내에 **dependencies** 부분 삭제하고 의존성을 정리해준다
```
npm i
yarn add @nehalist/gatsby-theme-nehalem
yarn add gatsby-cli
gatsby develop
```
  - 이때 gatsby-cli 를 설치 안해주면 오류가 남
- 마지막으로 <http://localhost:8000> 으로 접속해서 개발서비스가 잘 띄워줬는 지 확인한다.

## 다음 스텝
- 깃헙에 리포지토리를 생성하여 새로 생성한 블로그 폴더를 커밋한다
- netlify 배포하기 위하여 package.json 내에 'build' 스크립트를 아래와 같이 설정한다
```
gatsby clean && gatsby build
```