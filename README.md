# 대전경찰청 웹사이트 리팩토링

기존 정적 퍼블리싱 웹사이트를 React 기반으로 전환하고, 공통 레이아웃·반응형 UI·인터랙션을 개선한 프론트엔드 프로젝트입니다.

## 주요 작업

- HTML/CSS/jQuery 구조를 React, TypeScript, Vite로 마이그레이션
- 공통 Header, Navigation, Footer와 페이지 레이아웃 컴포넌트 구성
- 메인 페이지의 슬라이더, 공지 탭, 관련 사이트 드롭다운, 퀵링크 구현
- 역사관 갤러리, 페이지네이션, 이미지 모달 구현
- 모바일 메뉴 및 반응형 레이아웃 지원
- 카드·메뉴·드롭다운의 호버 인터랙션 개선
- 기존 정적 퍼블리싱 원본을 `legacy/`에 보관
- GitHub Actions를 통한 GitHub Pages 자동 배포 구성

## 기술 스택

- React
- TypeScript
- Vite
- React Router
- CSS
- GitHub Actions / GitHub Pages

## 프로젝트 구조

```text
src/
  components/       공통 레이아웃 및 UI 컴포넌트
  data/             공지, 갤러리, 메뉴 데이터
  pages/            메인 및 역사관 페이지
  styles/           전역 스타일
  lib/              이미지 자산 경로 유틸리티
img/                기존 이미지 자산
legacy/             이전 정적 퍼블리싱 원본
.github/workflows/  GitHub Pages 배포 워크플로
```

## 배포

`main` 브랜치에 푸시하면 GitHub Actions가 자동으로 빌드하고 GitHub Pages에 배포합니다.

배포 주소: <https://hyeon924.github.io/police-website/>

> GitHub 저장소의 **Settings → Pages → Source**는 `GitHub Actions`로 설정해야 합니다.
