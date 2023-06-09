# **Galpy**

<br>

<p align="center">
  <img width=300 src="https://github.com/CheckGalpy/galpy-client/blob/develop/assets/images/logo.png" />
</p>

<br>

Galpy는 간단한 촬영으로 **책갈피**를 생성하고 관리할 수 있게 해주는 모바일 어플리케이션입니다.

**팔로잉** 기능을 통해 자신의 책갈피를 공유하거나 관심 계정의 책갈피를 열람할 수 있으며, **추천 알고리즘**을 통해 유사한 관심사를 가진 사용자의 책갈피를 추천 받고, 취향에 맞는 책갈피를 **즐겨찾기**에 추가할 수 있습니다.

> [Galpy 시연 영상](https://youtu.be/cUFZ1A8MCoU?t=5132) 

> [서버 레포지토리](https://github.com/CheckGalpy/galpy-server)

<br>

# Table of Contents

- [Preview](#preview)
- [Motivation](#motivation)
- [Challenges](#challenges)
  - [1. 책갈피 추가하기](#1-책갈피-추가하기)
    - [지저분하게 추출된 텍스트를 간편하게 가공할 순 없을까?](#지저분하게-추출된-텍스트를-간편하게-가공할-순-없을까)
    - [연사모드: 여러 이미지를 묶어 하나의 책갈피를 생성하기](#연사모드:-여러-이미지를-묶어-하나의-책갈피를-생성하기)
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

처음에는 해당 글귀의 위치를 표시하기 위해 책 페이지의 모서리를 접거나 본문에 밑줄을 긋는 등의 방법을 사용하였습니다. 하지만 책 원본이 훼손된다는 단점이 있었고, 이를 극복하기 위해 메모앱/노션등의 기록도구를 사용하여 저장하고자 하는 글귀를 일일이 타이핑치고 분류해 왔습니다. 하지만 책을 읽을 때마다 항상 컴퓨터가 필요하다는 점과, 기록과 읽기를 병행해야 한다는 점은 여전히 큰 불편함으로 다가왔습니다.

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

OCR API의 한국어 텍스트 인식률이 높지 않을 수 있겠다라는 우려와 달리, 추출된 문자열 자체의 정확도는 준수했습니다. 하지만, 추출된 텍스트의 포맷은 촬영하는 책 페이지의 레이아웃에 따라 중구난방이라는 어려움이 있었습니다. 또한 추출된 텍스트를 **가독성이 좋은 블록 형태**의 책갈피로 저장하기 위해선, 사용자가 일일이 줄을 오가며 **줄바꿈**을 되돌려야 한다는 불편함이 있었습니다.

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

### 연사모드: 여러 이미지를 묶어 하나의 책갈피를 생성하기

책갈피를 생성하며 유저가 겪는 또다른 어려움은, 촬영하고 싶은 글귀가 책의 좌우 두 페이지에 걸쳐있을 때 발생 하였습니다. 기존의 기능만으로는 분단된 글귀를 각각 별개의 책갈피로 생성하거나, 하나의 글귀만 촬영하여 나머지 텍스트를 직접 추가해야 하는 불편함이 있었습니다. 

<p>
    <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/69c4c876-b340-4266-965e-b0a6cb29160e7">
</p>

<br>

이를 해결하기 위해 `연속스캔` 기능을 구현하였으며, 해당 기능은 첫 촬영 이후에 활성화 되어 **사용자가 원하는 만큼의 이미지를 단일 텍스트 덩어리로** 연결하여 책갈피를 생성합니다. 

**연속스캔** 기능을 구현하기 전에는, 추출한 텍스트를 전역으로 관리할 필요가 없어 `useState`를 통해 로컬에서 상태를 관리하였습니다. 하지만 연속스캔 기능을 구현하기 위해선 스크린이 네비게이션 사이를 이동할 때에도 상태가 전역으로 관리되어야 했으며, 이에따라 대부분의 상태를 `redux`를 통해 관리하는 것으로 변경하였습니다.

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

### 책갈피 추천은 어떤 근거로 이루어질까?

**책갈피를 손쉽게 생성하고 관리**한다라는 핵심 기능 이외에도, Galpy에는 사용자들이 자신의 책갈피를 공유하거나 관심 계정을 **팔로우** 하고 해당 계정의 책갈피를 열람할 수 있게 하는 기능들이 있습니다. **독서는 혼자서 하는 것**이라는 고정관념을 깨고, 관심사가 비슷한 이들과 자신들이 읽은 책갈피의 내용을 공유함으로서, 독서는 각자의 위치에서 **함께 할 수 있는 것**이라는 방향을 추구했기 때문입니다.

사용자의 취향을 분석하여 비슷한 관심사를 가진 계정과 책갈피를 추천하기 위해선, 먼저 사용자들의 관심사가 얼마나 유사한지 비교할 수 있는 기준이 필요했습니다. 사용자는 자신의 책갈피에 해시태그를 추가할 수 있는데, 이렇게 생성된 해시태그 데이터를 분석하여 사용자의 **관심사를 수치화**할 수 있었습니다.

<br>

### 관심사 유사도는 어떻게 계산할 수 있을까?

유사도를 비교하는데 주로 사용되는 방법은 3가지로 코사인 유사도, 유클리드 거리, 그리고 자카드 유사도가 있습니다.

#### 1. 코사인 유사도

코사인 유사도는 문장 내의 단어들이 얼마나 유사한 방향을 가리키는지 측정합니다. 이 방법에서는 각 문장을 벡터로 표현하고, 두 벡터 간의 각도를 기반으로 유사도를 계산합니다. 

<p align="center">
  <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/2a8c50526e2cc7aa837477be87eff1ea703f9dec" align="center" width="40%">&nbsp;
  <img src="https://wikidocs.net/images/page/24603/%EC%BD%94%EC%82%AC%EC%9D%B8%EC%9C%A0%EC%82%AC%EB%8F%84.PNG" align="center" width="40%">
</p>

<br>

#### 2. 유클리드 거리

유클리드 거리는 각 문장을 벡터로 표현한 뒤, 두 벡터간의 직선 거리를 계산하여 단어들이 얼마나 떨어져 있는지를 측정하는 방식입니다. 직선 거리가 짧을 수록 더 유사도는 높게 평가됩니다.

<p align="center">
  <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/7c862a5c-4a17-4683-b068-5e750853c348" align="center" width="48%">
</p>

<br>

#### 3. 자카드 유사도

마지막으로 자카드 유사도 방식에서는 두 집합이 얼마나 공통적인 원소를 가지는지를 토대로 유사도를 측정하며, 단순히 교집합 크기를 합집합 크기로 나눈 값을 기반으로 유사도를 계산합니다. 

<p align="center">
  <img src="https://github.com/CheckGalpy/galpy-client/assets/105766632/021d165d-7822-462d-9cd1-0e3a66b6b230" align="center" width="30%">
</p>

<br>

#### 유사도 계산 방법 별 차이

각 측정방법에 따라 문서간 유사도를 비교한 결과는 다르게 나타날 수 있었습니다. 예를 들어 아래의 3 문장을 각기 다른 유사도 측정방식으로 비교한다고 가정해 보겠습니다:

  - 문장1: "나는 사과와 바나나를 좋아하지만, 포도는 싫어한다"
  - 문장2: "나는 사과와 바나나를 좋아한다"
  - 문장3: "나는 감자와 당근을 좋아한다"

<br>

위의 세 문장을 각기 다른 유사도 측정방식으로 비교하기 위해, 단어의 빈도수에 따른 벡터화를 진행한 결과는 다음과 같습니다:

| - | 나는 | 사과와 | 바나나를 | 좋아하지만 | 포도는 | 싫어한다 | 감자와 | 당근을 | 좋아한다 | 사과와 |
| - | - | - | - | - | - | - | - | - | - | - |
| "나는 사과와 바나나를 좋아하지만, 포도는 싫어한다" | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| "나는 사과와 바나나를 좋아한다" | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| "나는 감자와 당근을 좋아한다" | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 |

<br>

위의 예시를 각각의 유사도 계산 방식에 따라 비교한 결과는 다음과 같습니다:

| - | 문장1 & 2 | 문장1 & 3 | 문장2 & 3 |
| - | - | - | - |
| 코사인 유사도 | ~0.77 | ~0.18 | 0.23 |
| 유클리드 거리 | sqrt(3) | sqrt(6) | sqrt(5) |
| 자카드 유사도 | 0.5 | 0.125 | 0.167 |

<br>

모든 유사도 측정 방식에서 문장 1과 2가 가장 유사하다고 판단하지만, 코사인 유사도에서는 문장 1과 2가 가장 덜 유사했고 유클리드 거리와 자카드 유사도 방식에서는 문장 1와 3이 가장 덜 비슷했습니다. 이렇듯 측정방식 별로 결과가 다를 수 있어 Galpy와 **가장 적합한 유사도 측정 방식을 선정**하는 것이 매우 중요했습니다.

각 유사도 별 장단점은 아래와 같이 정리됩니다:

| - | 코사인 유사도 | 유클리드 거리 | 자카드 유사도 |
| - | - | - | - |
| 장점 | 문서의 크기(길이)에 영향을 받지 않음, 희소 데이터에도 잘 작동하며, 고차원 데이터에 대해 계산이 효율적 | 두 벡터 간의 절대적인 거리를 측정하므로, 벡터의 크기가 중요한 경우에 사용하기 좋음 | 단어의 존재 유무만을 고려하므로, 특정 단어가 여러 번 등장하는 경우에도 잘 작동 |
| 단점 | 문장의 구조, 단어의 순서를 고려하지 않음 | 고차원 데이터에서는 성능이 떨어질 수 있으며, 문장의 길이가 서로 다른 경우 잘 작동하지 않을 수 있음 | 단어의 빈도수를 고려하지 않음. 두 문서가 동일한 단어를 가지고 있더라도, 그 단어들이 문서 내에서 얼마나 자주 등장하는지는 고려하지 않음 |

<br>

Galpy를 사용하는 사용자의 특성을 고려할 때, 생성하는 책갈피의 길이가 다 다르고 나타나는 단어의 빈도수에 따라 관심도가 구분되어야 한다고 생각했습니다. 따라서 최종적으로는 **코사인 유사도** 방식을 사용하여 사용자들의 관심사 유사도를 측정하기로 최종 결정하였습니다.

<br>

### 관심사 유사도의 사전연산을 통해 로딩시간 단축하기

쿠팡이나 NETFLIX와 같이 사용자의 취향을 분석하여 다른 상품을 추천하는 알고리즘이 중요한 기업에서는, 사용자와 취향이 비슷한 **다른 사용자의 선택**을 해당 사용자에게 추천하는 방식을 도입하고 있습니다. 이 방법을 벤치마킹 하여 Galpy에서는 사용자가 팔로우 하고 있지 않은 계정 중에서, **관심사 유사도가 가장 높은 계정 5개의 책갈피를 하나씩 추천** 하는 방식을 채택 했습니다. 그 이유는 똑같이 5개의 추천을 하더라도, 관심사 유사도가 가장 높은 계정 1개의 책갈피 5개를 추천할 때보다 사용자들의 교류를 더 적극적으로 촉진시킴으로서 취향이 비슷한 계정의 팔로우를 장려하고 **책갈피 공유문화를 활성화** 할 수 있을거라 생각했기 때문입니다.

가장 유사도가 높은 계정을 판별하기 위해서는 모든 사용자간의 유사도를 연산해야 했는데 사용자가 100명일 때와 1000명일 때의 빈도는 다음과 같았습니다:
  - 유저 100명: 유사도 연산 4,950번 
  - 유저 1000명: 유사도 연산 약 50만번

유저가 늘어남에 따라 연산해야하는 수가 기하급수적으로 늘어났으며, 사용자가 메인화면에서 책갈피를 추천받을 때마다 이러한 연산이 일어난다면 UX를 심각하게 해칠 수 있다고 판단하였습니다.


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

