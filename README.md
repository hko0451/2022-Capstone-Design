<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]

## 프로젝트 개요

저시력자 비대면 소프트웨어 교육용 블록 코딩 서비스

### 장애인 SW 교육이 필요한 이유

정보통신기술의 융합을 바탕으로 하는 소프트웨어와 관련된 기술 변화는 광범위하게 사회구조를 변화시켰고,
생활양식을 넓혀 교육환경까지 급속하게 변화시키고 있다.
이러한 변화는 교육에서 이전에 요구되던 기초학습능력과 더불어
컴퓨팅 사고력이라는 역량까지 요구하고 있다.
여기서 컴퓨팅 사고력이란 문제해결과정에서 추상화 과정을 통해 문제의 핵심요소를 추출하고
모델링하여 컴퓨팅 기기를 통해 해법을 자동화하는 능력을 의미한다.
SW교육이란 컴퓨팅 사고력을 기반으로 문제를 해결하는 역량을 함양하기 위한 교육이다.

SW교육 자료 개발, 온라인 교육 프로그램 운영, 교원연수 및 시범학교 선정 등은
대부분 일반학생을 중심으로 운영되는 것을 알 수 있다.
이러한 추세로는 정보접근성이 상대적으로 제한되는 장애학생의 특성으로 인해
일반 학생과 SW교육의 양과 질의 격차는 더욱 크게 벌어질 것이다.
SW교육의 의무교육 대상자로 장애학생도 포함되지만
장애학생의 SW교육은 여전히 답보상태에 머물러 있으며,
일부 지적장애학생에게는 도달하기 어려운 과제라는 선입견에 의해
컴퓨터의 기능, 형식과 같은 도구적 활용 측면만 강조하거나,
SW교육의 필요성 부분에서 의문을 제기하는 경우도 있다.

이에 장애학생들도 2015 개정 교육과정에 따라 초등학교(5~6학년)는 2019년부터 17시간,
중학교는 2018년부터 단계적으로 34시간 이상 의무적으로 이수하며,
2015 개정특수교육 교육과정의 실과(초등학교)와 선택교과(정보통신활용)를 통해
SW교육활동을 경험하고 사고의 폭을 확대하고 있다.
이러한 장애학생 SW교육을 지원하기 위해 교육부 및 국립특수교육원과
각 시·도교육청에서는 다양한 방식으로 노력하고 있다.
특히 국립특수교육원은 2018년부터 시·청·지체, 발달장애 영역별로 SW교육 프로그램을
연차적으로 개발하여 보급하였으며, 2019년에는 일반교육과정 초‧중‧고와
기본교육과정 정보교과 내 SW교육을 위한 교과서 보완자료를 개발하였다.

> https://www.nise.go.kr/sub/info.do?m=041104&s=eduable&page=0411

다만 현재 한국의 SW교육은 언플러그드 교육을 중심으로 진행되어 비대면 수업에 적합하지 않다. 따라서 비대면 수업에서도 사용할 수 있는 시각 장애인용 블록 코딩을 구현하고자 한다.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 사용한 프레임워크

* [![Vue][Vue.js]][Vue-url]
* [![SpringBoot][SpringBoot-shield]][SpringBoot-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 기능 구현

- [x] 로그인
- [ ] 회원가입
- [ ] 프로필
    - [ ] 워크스페이스 생성
    - [ ] 워크스페이스 저장
    - [ ] 워크스페이스 삭제
- [ ] 블록 코딩
  - [x] 변수 생성
  - [x] 조건문
  - [x] 반복문
  - [x] 텍스트
  - [ ] 코드 생성
  - [ ] 커스텀 블록
- [ ] 접근성 기능
  - [ ] 탠저블 코딩(NFC 
  - [ ] 음성 인터페이스

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/hko0451/2022-Capstone-Design/graphs/contributors
[SpringBoot-shield]: https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=Spring&logoColor=white
[SpringBoot-url]: https://spring.io/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
