# 구해줘 댕냥쓰 🐶🐱

> 잃어버린 우리 댕냥이<br />
> 하루종일 보호소 공고 확인하셨다구요?<br />
> 보호소에서 찾는건 <b>구해줘 댕냥쓰</b>에게 맡겨주세요!🔍<br />
> 잃어버린 위치 주변에서 찾은 댕냥이들을 알려줄게요🦾 <br />

<br/>

> ## 어떤 서비스인가요?

- 유기동물보호소에 새로운 구조 여부 알림 서비스 (반려동물을 잃어버린 위치의 주변에 있는 보호소에서 새로운 구조가 있다면 주인에게 알림을 보내드립니다.)

<br/>

> ## 누구를 위한 서비스인가요?

- <b>반려동물을 잃어버린 주인</b>이 사용자입니다.

<br/>

> ## 해결하려는 문제가 무엇이고 어떻게 해결하였나요?

1. 반려동물을 잃어버린 사람이 실시간으로 보호소 구조 공고를 확인하는 번거로움 <br/>(입소 후 10일이 지나면 안락사를 진행합니다.) <br/>
   -> <b>SMS 알림 서비스</b>

2. 거주 지역 보호소만 확인하느라 다른 지역 주변 보호소 구조 공고를 놓치는 경우 <br/>(중형견 같은 경우 하루 만에 옆 도시로 넘어갈 수 있습니다.) <br/>
   -> <b>위치 기반</b> (반경 N km 내 보호소 새롭게 구조된 내역 알림)

<br/>

> ## 문제를 해결한다면 무엇이 더 나아질까요?

- 안타깝게 안락사 당하는 반려동물을 줄일 수 있습니다.
- 주인이 반려동물 찾기 위한 다른 일에 집중할 수 있습니다.
- 분실 데이터가 많이 올라온다면 추후 맹견 알림 서비스를 하여 개물림 사고를 예방할 수 있습니다.

<br/>

> ## 기존에는 이런 서비스가 없었나요?

- 비슷한 서비스로 포인핸드가 있습니다. 포인핸드는 단순히 사용자가 선택한 관할지역 기준 보호소 구조 공고만 제공합니다.
- 우리 서비스에서는 반경 Nkm 위치 기반으로 관할지역과 상관없고 알림까지 받을 수 있습니다.

<br/>

> ## 기능을 간단히 정리해주세요.

- 주제 : 반려동물을 잃어버린 위치 주변의 유기동물보호소에서 새롭게 구조된 동물 여부를 문자로 주인에게 알려주는 서비스
- 메인기능 :
  - 실종 장소 주변 보호소에서 새롭게 구조된 동물 여부 <b>알림 기능</b>
  - 보호소에서 구조한 위치와 정보를 나타내는 <b>보호소 구조 공고 지도 기능</b>
  - 실종 위치와 번호를 등록하는 <b>실종 등록 기능</b>
- 서브기능 :
  - 로그인/회원가입
  - 보호소 구조 공고 목록
  - 전체 분실 목록
  - 마이페이지
  - 관리자 페이지
  - 페이지 네이션
  - 목록 지도 전환 토글 기능
  - 필터 기능
    <br/>

<br/>

> ## Figma
[Figma Link](https://www.figma.com/file/8QNY0Il76dIr7fUDNXhkjz/2nd-Project-Rescue-Puppy-Kitten?node-id=0%3A1)
<br/><br/>
<img width="600" alt="before1" src="https://i.ibb.co/bLKMnLq/image.png">

<!-- <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F8QNY0Il76dIr7fUDNXhkjz%2F2nd-Project-Rescue-Puppy-Kitten%3Fnode-id%3D0%253A1" allowfullscreen></iframe> -->

</br>

> ## 스토리보드 및 유저 시나리오

- 사용자는 로그인하면 햄버거 메뉴의 분실등록으로 이동한다.
- 사용자는 분실등록에서 분실정보를 기입하고 게시글을 등록할 수 있다.
- 사용자는 분실목록에서 모든 사용자 전체 분실글을 확인할 수 있다.
- 사용자는 마이페이지에서 개인정보 수정, 본인 분실신고 리스트, 계정탈퇴를 할 수 있다.
- 사용자는 마이페이지에서 분실신고 리스트에서 분실 게시글 상세를 확인하고 수정 할 수 있다.
- 사용자는 메인 페이지 및 햄버거메뉴 구조리스트에서 보호소에서 올라온 공고들을 확인할 수 있다.
- 사용자는 메인 페이지 및 햄버거메뉴 구조리스트에서 보호소에서 올라온 공고들을 종별로 필터링 할 수 있다.
- 사용자는 메인 페이지 지도보기 버튼 토글 및 햄버거메뉴 구조지도에서 보호소에서 지도 페이지로 전환 할 수 있다.
- 관리자는 관라자페이지에서 회원정보관리, 분실신고 리스트 확인을 할 수있다.
- 관리자는 회원정보 관리에서 회원을 삭제할 수 있다.
- 관리자는 분실 신고 리스트에서 분실신고를 삭제할 수 있다.

<br/>

> ## 구현 기능 명세

<br/>

#### 1. 메인페이지-구조 목록

<br/>
<img width="600" alt="mainPage" src="https://github.com/save-pet/service/assets/70076564/6ed2cbb0-8a89-4ad7-8a55-72001d809ac1">

    1.1 사용자가 선택한 개수씩 목록 보기

    1.2 페이지네이션 적용

    1.3 동물 종류에 따른 카테고리 기능

    1.4 구조 목록-구조 지도 전환 토글 버튼

    1.5 반응형 페이지 디자인

<br/>

#### 2. 회원가입, 로그인 페이지

<br/>

<img width="600" alt="register" src="https://github.com/save-pet/service/assets/70076564/13f8d1c3-0948-4468-a671-e24688377752">
<img width="600" alt="login" src="https://github.com/save-pet/service/assets/70076564/9aa8e3a9-5ed8-4ff2-84e3-46e5d8b96812">

    2.1 아이디, 비밀번호, 전화번호 유효성 검증

    2.2 관리자계정 별도 관리

    —> 로그인한 계정에 따라 마이페이지 연결시 일반회원>마이페이지 관리자>관리자페이지 연결

<br/>

#### 3. 마이페이지

<br/>

<img width="600" alt="myPage" src="https://github.com/save-pet/service/assets/70076564/a653a39a-8e6a-4058-9851-1ca572eaf892">

    3.1 회원정보 수정 유효성 검증

    3.2 본인이 등록한 분실 신고목록 상태변경, 삭제, 상세보기 가능

    3.3 계정 탈퇴 가능

    —> 비밀번호 일치여부에 따라 계정 삭제 가능

<br/>

#### 4. 관리자페이지

<br/>

<img width="600" alt="before1" src="https://github.com/save-pet/service/assets/70076564/c2de87fe-5c3f-489c-be35-367e230a5840">

    3.1 모든 회원정보 확인 가능

    3.2 신고된 분실목록 전체 조회 가능

<br/>

#### 5. 분실 등록

<br/>

<img width="600" alt="posting lost" src="https://github.com/save-pet/service/assets/70076564/9c6c401b-becd-4f65-822d-f2ed78a793ef">

    4.1 카카오 지도를 이용하여 분실 위치 받기

    4.2 위,경도로 받은 분실 위치를 주소로 변환하여 사용자에게 나타내기

    4.3 사진 서버에 저장

    4.4 분실 등록 삭제

    4.5 분실 등록 수정

<br/>

#### 6. 분실 상세

<br/>

<img width="600" alt="lost list" src="https://github.com/save-pet/service/assets/70076564/7ff919ca-e60b-405a-8629-60c4db6f932e">

<br/>

#### 7. 구조 지도

<br/>

<img width="600" alt="before1" src="https://github.com/save-pet/service/assets/70076564/b25a7a3f-a3dc-48a8-9a8a-0fa5576c3f45">

    7.1 현재 위치 기준으로 주변의 구조된 동물 발견 위치 맵핑(카카오 map api 사용)

    7.2 info window로 구조 사진 및 간단한 정보 표시

    7.3 핀 위에 마우스 오버 시 포커스 이동

    7.4 핀 클릭 시 해당 구조 상세페이지로 이동

<br/>

#### 8. 보호소별 구조 목록

<br/>

<img width="600" alt="shelter list" src="https://github.com/save-pet/service/assets/70076564/92ea1f9e-c693-4a1a-af51-c3c7b30e3c4b">
<img width="600" alt="shelter rescued list" src="https://github.com/save-pet/service/assets/70076564/0cf701f0-3ddd-40dc-b2da-4c1c6cd481a5">

    8.1 보호소 목록을 통해 보호소별 구조 동물 탐색 가능

<br/>

#### 9. 기타

<br/>

    9.1 localStorage에 token 저장하여 로그인 시 nav바 메뉴 변경

    9.2 sticky header와 hamburger menu 적용

    9.2 근처에 구조된 새로운 내역이 있다면 SMS으로 알림 표시 (twilio 사용)

    9.3 데이터 파이프라인 실시간 현황 페이지

<br/>

##### 햄버거 메뉴

<img width="600" alt="data pipeline" src="https://github.com/save-pet/service/assets/70076564/b6b7d260-4f66-47e6-896a-38d12f75421b">

<br/>

##### 데이터 파이프라인 실시간 현황 웹페이지

<img width="600" alt="data pipeline" src="https://github.com/save-pet/service/assets/70076564/c7ce35d9-e9ca-4706-acac-1ed9241d493e">

<br/>

##### 문자알림

<img width="600" alt="text message" src="https://github.com/save-pet/service/assets/70076564/eb524189-8573-4092-ba3d-0d4be7d576da">
<br/>

<br/>

> ## 실행방법

```bash
@~project-templet> npm install --global yarn
@~project-templet> npm install && yarn setup # yarn setup는 client server 각 폴더에 자동으로 패키지를 설치하는 사용자 정의 명령어입니다.
@~project-templet> yarn start

```

## Stack

### FRONT

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/> <img src="https://img.shields.io/badge/Font Awesome-528DD7?style=flat-square&logo=Font Awesome&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat-square&logo=Nodemon&logoColor=white"/> <img src="https://img.shields.io/badge/Kakao Map API-FFCD00?style=flat-square&logo=Kakao&logoColor=white"/> <img src="https://img.shields.io/badge/React Kakao Maps SDK-FFCD00?style=flat-square&logo=Kakao&logoColor=white"/>

### BACK

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white"/>

### DATA

<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/> <img src="https://img.shields.io/badge/Google Cloud Compute Engine-4285F4?style=flat-square&logo=Google Cloud&logoColor=white"/> <img src="https://img.shields.io/badge/Linux Crontab-FCC624?style=flat-square&logo=Linux&logoColor=white"/> <img src="https://img.shields.io/badge/Twilio SMS-F22F46?style=flat-square&logo=Twilio&logoColor=white"/> <img src="https://img.shields.io/badge/PyMongo-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/Apache-D22128?style=flat-square&logo=Apache&logoColor=white"/> <img src="https://img.shields.io/badge/Shell Script-FFD500?style=flat-square&logo=Shell&logoColor=white"/> <img src="https://img.shields.io/badge/공공데이터API-336699?style=flat-square&logo=Publons&logoColor=white"/>

### Collabo

<img src="https://img.shields.io/badge/GitMoji-F05032?style=flat-square&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/> <img src="https://img.shields.io/badge/Asana-273347?style=flat-square&logo=Asana&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white"/>

<br/>

> ## 해당 스택을 사용한 목적

- React:
  - 다급한 사용자를 위해 한페이지에서 해결할 수 있도록 (UX)
  - 여러 중복되는 컴포넌트 재사용
  - 가상DOM으로 사용자 상호작용이 많은 페이지 성능 향상
  - CSR을 사용한 이유: 반려동물을 잃어버린 사람들이 필요에 따라 찾아와야하기 때문에 굳이 SEO를 고려하지 않아도 괜찮았다. 서버단에서 거리 계산이나 데이터 가져오기 등 부하가 많기 때문에 렌더링을 줄여서 서버에 부하를 줄여주는 게 좋아서 CSR로 구현
- Python
  - 문자열 및 데이터 처리에 편리하다.
  - 필요시 멀티스레드를 사용할 수 있다.
- GCP
  - 무료 크레딧 이상으로 자동결제 되지 않는다.
  - 필요시 bigquery나 airflow를 구축할 수 있다.
  - 자동으로 특정시간 켜지고 꺼지도록 설정하는 방법을 알고 있어 크레딧을 아낄 수 있다.
- crontab
  - Linux에 기본으로 있는 기본기능이라 설치하거나 설정하는 큰 번거로움이 없다.
  - Airflow와 달리 상태를 확인하기 어려운데 코드 실행시 각 단계를 자동으로 html에 write 하여 웹을 통해 상태를 살펴 볼수 있도록 구축했다.
- Apach
  - APM setup 이라 불릴 만큼 고전적이지만 익숙하고 기본적인 웹서버이기 때문이다.
- twillio
  - 네이버 문자와 다르게 자동결제 되지 않는다.
  - 무료 크레딧으로 네이버 50건에 비해 약 300건 많은 발송이 가능하다.
  - 단 무료버전에서 문자를 받으려면 문자인증 과정이 필요하다.
- 공공데이터 API
  - 대전지역 데이터가 더 정확하고 자세하지만 전국 데이터를 사용한 이유는 지역기반이 아닌 실종위치기반으로 서비스를 하기 위해서다. 중형견은 하루만에 몇십km를 달려 대전을 넘어간다.

</br>

> ## 팀원 역할
>
> <br/>

| 이름   | 역할                                                                  | 구현 기능                                                                                                     |
| ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 황채림 | <img src="https://img.shields.io/badge/FE-06B6D4?style=flat-square"/> | 헤더,햄버거 메뉴, 메인페이지, 구조리스트,필터, 페이지네이션, 목록 <->지도 전환 토글                           |
| 김재민 | <img src="https://img.shields.io/badge/FE-06B6D4?style=flat-square"/> | 데이터 pipeline 서버 구축, 문자서비스, 지도 페이지, 로그인, 회원가입 페이지, API(보호소코드, 보호소별 동물수) |
| 김소리 | <img src="https://img.shields.io/badge/FE-06B6D4?style=flat-square"/> | 분실등록 위치, 사진 등록 기능, 분실동물 상세 정보 불러오기, 구조동물 상세페이지, 지도 페이지                  |
| 임연주 | <img src="https://img.shields.io/badge/FE-06B6D4?style=flat-square"/> | 개인정보 수정, 계정 탈퇴, 분실목록 불러오기, 관리자페이지, 회원가입, 로그인                                   |
| 이진서 | <img src="https://img.shields.io/badge/BE-000000?style=flat-square"/> | 로그인, 회원가입, 구조동물, 분실동물 관련, 데이터 구축, 서버연결                                              |

<br/>
