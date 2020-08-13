---
title: "VS Code에서 깃 이전 커밋으로 되돌리기 (Git Undo Last Commit)"
path: "/posts/2020-08-vscode-git-reset"
tags: ["git","vscode"]
featuredImage: "./cover.jpg"
excerpt: VS Code GUI 상에서 git reset 명령 실행하기
created: 2020-08-13
updated: 2020-08-13
---

## VS Code와 깃(Git)
VS Code는 Git에 의존성이 있는 것으로 보인다. VS Code를 설치하면 따로 깃을 설치하지 않아도 **Source Control 메뉴**를 통해 깃을 이용할 수 있다. 또한 Terminal 창에서 git 명령어가 잘 실행된다. GUI 상에서 실행한 git 명령과 출력은 Source Control 메뉴 우상단 점 세개(...) 아이콘 클릭 후 **Show Git Output**을 통해 확인할 수 있다. 주로 사용하는 기능은 Message 란에 커밋(Commit) 메시지를 입력하고 **컨트롤+엔터**로 커밋. 우상단 ... 클릭 후 저장소(repository)에 반영(Push)하기 정도다. 스테이징(staging)은 생략할 수 있다.

## 저장소보다 이전 커밋으로 되돌리기
잘 못된 코드를 반영하여 이전 커밋으로 되돌리고 싶다면, 우상단 ... 클릭 후 **Undo Last Commit**을 실행한다. 바로 한 단계 이전의 상태로 변경된다. GUI라서 직관적이다. 같은 동작을 반복하여, 원하는 시점으로 되돌아갔다면, Terminal 창에서 ```git push -f origin master```로 강제 반영해준다. 일부 파일은 제외하고 싶다면 해당 파일 위에서 마우스 우측 버튼을 누르고 **Unstage Changes**를 선택하여 스테이징을 해제한다. 그리고 해당 파일명에[ 마우스를 올려놓고 반시계 방향 화살표의 Discard Changes 버튼을 눌러준다. 만약 Undo Last Commit로 3단계 전의 상태로 돌아간 상태였다면, 해당 파일만 2단계 전의 상태가 된 것이다. ```git push -f origin master``` 통해 저장소에도 반영한다.

## 터미널에서 하려면?
... 메뉴에서 **Show Git Output**을 클릭하고 하단 Output 창을 살펴보면, ```git reset --soft HEAD~``` 구문이 보인다. 터미널에서 실행하는 명령인 것이다.