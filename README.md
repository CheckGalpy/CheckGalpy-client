# **Galpy**

<br>

<p align="center">
  <img width=300 src="https://github.com/CheckGalpy/galpy-client/blob/develop/assets/images/logo.png" />
</p>

<br>

Galpy는 간단한 촬영으로 **책갈피**를 생성하고 관리할 수 있게 해주는 모바일 어플리케이션입니다.

**팔로잉** 기능을 통해 자신의 책갈피를 공유하거나 관심 계정의 책갈피를 열람할 수 있으며, **추천 알고리즘**을 통해 유사한 관심사를 가진 사용자의 책갈피를 추천 받고 취향에 맞는 책갈피를 **즐겨찾기**에 추가할 수 있습니다.

> [Galpy 시연 영상](https://youtu.be/cUFZ1A8MCoU?t=5132) 

> [서버 레포지토리](https://github.com/CheckGalpy/galpy-server)

<br>

# Table of Contents

- [Preview](#preview)
- [Motivation](#motivation)
- [Challenges](#challenges)
  - [1. 책갈피 추가하기](#1-책갈피-추가하기)
    - [지저분하게 추출된 텍스트를 간편하게 가공할 순 없을까?](#지저분하게-추출된-텍스트를-간편하게-가공할-순-없을까)
    - [연사모드: 여러 이미지를 묶어 하나의 책갈피를 생성하기](#연사모드-여러-이미지를-묶어-하나의-책갈피를-생성하기)
  - [2. 추천 알고리즘](#2-추천-알고리즘)
    - [추천은 어떤 근거로 이루어질까?](#추천은-어떤-근거로-이루어질까)
    - [관심사 유사도의 사전연산을 통해 로딩시간 단축하기](#관심사-유사도의-사전연산을-통해-로딩시간-단축하기)
  - [3. UX 개선하기](#3-UX-개선하기)
    - [모든 책갈피의 썸네일 길이는 같아야 할까?](#모든-책갈피의-썸네일-길이는-같아야-할까)
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

책을 읽다가 인상깊은 글귀를 발견했을 때면 드는, '**이 책갈피는 저장해 두었다가 나중에 다시 읽고 싶다'**'라는 생각에서 Galpy는 출발하게 되었습니다.

처음에는 해당 글귀의 위치를 표시하기 위해 페이지의 모서리를 접거나 본문에 밑줄을 긋는 등의 방법을 사용하였습니다. 하지만 책 원본이 훼손된다는 단점이 있었고, 이를 극복하기 위해 메모앱/노션등의 기록도구를 사용하여 저장하고자 하는 글귀를 일일이 타이핑치고 분류해 왔습니다. 하지만 책을 읽을 때마다 항상 컴퓨터가 필요하다는 점과, 기록과 읽기를 병행해야 한다는 점은 여전히 큰 불편함으로 다가왔습니다.

<p align="center">
    <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/941d7bd4-bbc9-4abd-81aa-583d85796f0f">
</p>

<div align="center">
  <sub>기존에 책갈피를 저장하던 방법</sub>
</div>

<br>

이에 원본을 훼손하거나 일일이 기록하지 않아도 글귀를 저장할 수 있으며, 검색기능이 있어 연관된 주제의 책갈피들을 편리하게 열람할 수 있는 서비스가 있으면 좋겠다는 스스로의 니즈가 있었습니다. 그리고 이러한 니즈를 충족시키기 위해서는 카메라로 글귀를 촬영하여 텍스트를 추출하고, 추출된 텍스트를 책갈피의 형태로 생성하여 관리해주는 서비스가 필요하다고 판단하였습니다. 그렇게 OCR (광학문자열인식) API를 이용한 모바일 어플리케이션, Galpy를 기획하고 개발하게 되었습니다.

<br>

# Challenges

## 1. 책갈피 추가하기

### 지저분하게 추출된 텍스트를 간편하게 가공할 순 없을까?

촬영된 책의 페이지에서 텍스트를 추출하는 기능은 `React Native`와 `Google Vision API`를 이용하여 구현할 수 있었습니다. 

OCR API의 한국어 텍스트 인식률이 높지 않을 수 있겠다라는 우려와 달리 추출된 문자열 자체의 정확도는 높았습니다. 하지만, 추출된 텍스트의 포맷은 촬영하는 책 페이지의 레이아웃에 따라 중구난방이라는 어려움이 있었습니다. 또한 추출된 텍스트를 **가독성이 좋은 블록 형태**의 책갈피로 저장하기 위해선, 사용자가 일일이 줄을 오가며 **줄바꿈**을 되돌려야 한다는 불편함이 있었습니다.

<p>
    <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/e5c07d94-59b9-43a0-8776-2c3e7698c936">
</p>

<br>

이러한 불편함을 해소하기 위해 OCR API로 추출된 텍스트 덩어리를 분리하고, 줄바꿈을 제거한 뒤 다시 연결할 수 있는 로직을 정규표현식을 통해 아래와 같이 구현할 수 있었습니다.

```javascript
// EditableContent.js

const removeLineBreaks = () => {
  const newContent = localContent
    .split(/(\r\n|\n|\r)/gm)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(" ");
  setLocalContent(newContent);
};
```

<br>

매 촬영마다 `removeLineBreaks` 함수를 자동으로 트리거하여 오토포맷팅을 진행하는 것도 가능하지만, 조건에 따라 사용자가 포맷팅을 원치 않을 수 있다고 생각 하였습니다. 유저의 행위에 따라 선택적으로 이벤트를 실행시켜야 하지만, 별도의 버튼등을 추가하는 것은 UX를 해칠 수 있다고 판단 되었습니다. 이에 모바일 기기의 특성을 살려 `핀치모션` 감지를 통해 '**두 손가락을 오므리면 줄바꿈을 제거해주는 기능**'을 구현 하였습니다.

```javascript
// EditableContent.js

const onPinchEvent = ({ nativeEvent }) => {
  if (nativeEvent.scale < 0.99) {
    removeLineBreaks();
    console.warn("핀치모션 감지. 여백 삭제를 진행합니다.");
  }
};

const onPinchStateChange = (event) => {
  if (event.nativeEvent.oldState === State.ACTIVE) {
    removeLineBreaks();
  }
};

return (
  <>
    {editingContent ? (
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <View style={styles.container}>
          <TextInput
            value={localContent}
            onChangeText={handleContentChange}
            onBlur={handleBlur}
            autoFocus
            multiline
            style={styles.content}
          />
        </View>
      </PinchGestureHandler>
    ) : (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.content}>{localContent}</Text>
      </TouchableOpacity>
    )}
  </>
);
```

<br>

사용자의 핀치모션을 감지하기 위해 `react-native-gesture-handler` 라이브러리의 `PinchGestureHandler` 컴포넌트를 사용하였으며, 실수로 포매팅이 되는 것을 방지하면서도 모션의 인식이 용이한 범위의 감도를 설정하였습니다.

<p>
    <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/a5e4f56a-3cd1-4532-b875-d5cd0cc8fd07">
</p>

<br>

### 연사모드 - 여러 이미지를 묶어 하나의 책갈피를 생성하기

책갈피를 생성하며 유저가 겪는 또다른 어려움은, 촬영하고 싶은 글귀가 책의 좌우 두 페이지에 걸쳐있을 때 발생하였습니다. 기존의 기능만으로는 분단된 글귀를 각각 별개의 책갈피로 생성하거나, 하나의 글귀만 촬영하여 나머지 텍스트를 직접 추가해야 하는 불편함이 있었습니다. 

이를 해결하기 위해 `연속스캔` 기능을 구현하였으며, 해당 기능이 첫 촬영 후에 활성화 되어 **사용자가 원하는 만큼의 이미지를 하나의 텍스트 덩어리로** 합쳐질 수 있도록 하였습니다. 

OCR API를 이용해 추출된 텍스트는 `state`에 저장되어 관리되었는데, 이전까지는 추출된 텍스트를 전역으로 관리할 필요가 없어 `useState`를 통해 로컬에서 관리하였습니다. 하지만 네비게이션간 상태를 주고받아야 하는 `연속스캔` 기능을 구현하기 위해서는 전역 상태관리가 필요하였으며, 이에 `redux`를 적용하였습니다.  

```javascript
// ScanEdit.js

const handleConsecutiveScan = async () => {
  let textExtracted = await extractText();

  if (scannedTextStored) {
    textExtracted = scannedTextStored + " " + textExtracted;
  }
  dispatch(setScannedText(textExtracted));
  navigate("Scan");
};
```
  
  
<br>

## 2. 추천 알고리즘

<br>

### 추천은 어떤 근거로 이루어질까?

<br>

### 관심사 유사도의 사전연산을 통해 로딩시간 단축하기

<br>

## 3. UX 개선하기

<br>

### 모든 책갈피의 썸네일 길이는 같아야 할까?

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

### Front-End

- React Native
- Google Vision API
- Firebase
- Node.js
- Express
- MongoDB

### Back-End

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

