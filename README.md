# **Galpy**

<br>

<p align="center">
  <img width=300 src="https://github.com/CheckGalpy/galpy-client/blob/develop/assets/images/logo.png" />
</p>

<br>

Galpy는 간단한 촬영으로 **책갈피**를 생성하고 관리할 수 있게 해주는 모바일 어플리케이션입니다.

**팔로우** 기능을 통해 자신의 책갈피를 공유하고 관심 계정의 책갈피를 열람할 수 있으며, **추천 알고리즘**을 통해 유사한 관심사를 가진 사용자의 책갈피를 추천 받아 **즐겨찾기**에 추가할 수 있습니다.

> [Galpy 시연 영상](https://youtu.be/cUFZ1A8MCoU?t=5132)

<br>

# Table of Contents

- [Preview](#preview)
- [Motivation](#motivation)
- [Challenges](#challenges)
  - [1. 책갈피 추가하기](#1-책갈피-추가하기)
    - [이미지에서 원하는 텍스트만 추출할 수 있을까?](#이미지에서-원하는-텍스트만-추출할-수-있을까?)
    - [연사모드: 여러 이미지를 묶어 하나의 책갈피를 생성하기](#연사모드:-여러-이미지를-묶어-하나의-책갈피를-생성하기)
  - [2. 추천 알고리즘](#2-추천-알고리즘)
    - [추천은 어떤 근거로 이루어질까?](#추천은-어떤-근거로-이루어질까?)
    - [관심사 유사도의 사전연산을 통해 로딩시간 단축하기](관심사-유사도의-사전연산을-통해-로딩시간-단축하기)
  - [3. UX 개선하기](#3-UX-개선하기)
    - [나의 책갈피 vs. 타인의 책갈피](#나의 책갈피-vs-타인의-책갈피)
    - [검색 키워드 하이라이팅](#검색-키워드-하이라이팅)
    - [삭제하기와 팔로잉의 인터랙션 차이](#삭제와-팔로잉의-인터랙션-차이)
  - [4. 편의성과 보안](#4-편의성과-보안)
    - [리액트 네이티브의 토큰과 스토리지](#리액트-네이티브의-토큰과-스토리지)
- [Tech stack](#tech-stack)
- [Timeline](#timeline)
- [Remarks](#remarks)

<br>

# Preview

<p align="center">
  <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/5051b956-dfbe-45d9-9206-37f5805a5d13" align="center" width="19%">&nbsp;
  <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/44b18e62-ed3a-4741-beef-a6f7ba291e90" align="center" width="19%">&nbsp;
  <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/f5b2d654-8c5d-44da-a1e6-d35e8c5fc8c4" align="center" width="19%">&nbsp;
  <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/b4507762-4823-4491-b3b9-3c2f541d38c4" align="center" width="19%">&nbsp;
  <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/8e246ab2-b809-4128-a088-38ababb2c4a2" align="center" width="19%">
</p>

<br>

# Motivation

책을 읽다가 인상깊은 글귀를 발견했을 때 들었던, '**저장해 두었다가 나중에 다시 읽고 싶다'**'라는 생각에서 Galpy는 출발하게 되었습니다.

처음에는 해당 글귀의 위치를 표시하기 위해 페이지의 모서리를 접거나 본문에 밑줄을 긋는 등의 방법을 사용하였습니다. 하지만 책 원본이 훼손된다는 한계가 명확했고, 이를 극복하기 위해 메모앱/노션등의 기록도구를 사용하여 저장하고 싶은 문구를 일일이 타이핑치고 분류해 왔습니다. 하지만 책을 읽을 때마다 항상 컴퓨터가 필요하며 기록을 하기 위해 읽기에만 온전히 집중할 수 없다는 점은 여전히 한계로 다가왔습니다.

<p align="center">
    <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/941d7bd4-bbc9-4abd-81aa-583d85796f0f" align="center">
</p>

<div align="center">
  (기존 책갈피 저장방법)
</div>

<br>

원본을 훼손하지 않고, 타이핑 없이도 텍스트를 저장할 수 있게 하며, 검색이 가능하여 언제 어디서든 저장했던 내용을 편리하게 열람할 수 있게 해주는 서비스가 있으면 좋겠다는 스스로의 니즈를 확인하였습니다. 그리고 이를 해소하기 위해 OCR (광학문자열인식) API를 이용한 모바일 어플리케이션, Galpy를 기획하고 개발하게 되었습니다.

<br>

# Challenges

## 1. 책갈피 추가하기

###이미지에서 원하는 텍스트만 추출할 수 있을까?

<br>

### 연사모드 - 여러 이미지를 묶어 하나의 책갈피를 생성하기

<br>

## 2. 추천 알고리즘

<br>

### 추천은 어떤 근거로 이루어질까?

<br>

### 관심사 유사도의 사전연산을 통해 로딩시간 단축하기

<br>

## 3. UX 개선하기

<br>

### 나의 책갈피 vs. 타인의 책갈피

<br>

### 검색 키워드 하이라이팅

<br>

### 삭제와 팔로잉의 인터랙션 차이

<br>

## 4. 편의성과 보안

<br>

### 리액트 네이티브의 토큰과 스토리지

<br>

# Tech Stack

- React Native
- Google Vision API
- Firebase
- Node.js
- Express
- MongoDB

<br />

# Timeline

**기획기간 (6일) - 2023.04.03. ~ 2023.04.08.**

- 목업 디자인
- DB스키마 생성
- 칸반 생성

**개발기간 (18일) - 2023.04.09. ~ 2023.04.26.**

- 기능구현

<br>

# Remarks

사용자의 입장에서 시작하여, 디자이너의 시각에 이입을 하고, 개발자의 눈으로 제품을 개발할 수 있는 기회였습니다.

제품은 하나이지만 시각에 따라 각 입장별로 중요시하는 점은 다를 수 있다는 것을 직접 느끼고 경험할 수 있었습니다.

