# :blush: react-emotion-diary

![emotion-Animation](https://user-images.githubusercontent.com/77928818/217844646-9ef4d477-08ce-4649-89df-419b53af4494.gif)

React 기초 문법 공부를 마친 후 공부한 내용을 활용해서 제작한 첫 React 토이 프로젝트입니다.
처음에는 JSX 문법을 이용하여 기능구현을 하였으나 프로젝트 완성 후 Typescript 공부를 시작하였고 Typescript 기초 문법을 익힌 후 TSX 문법으로 수정하였습니다.

## 기술 사항
* 일기생성
* 일기수정
* 일기삭제
* 감정에 따른 일기 리스트 정렬
  - 좋은감정만, 안좋은감정만, 전부다
* 최신순, 오래된 순 선택하여 일기 리스트 정렬
* localStorage를 이용한 일기 저장
* 날짜별 일기 렌더링

### 1. 일기생성
일기 생성 시 감정, 날짜, 내용 등을 state로 저장 후 Context API를 이용해 데이터를 전달 한 다음 useReducer를 이용하여 데이터를 localStorage 저장소에 저장합니다.

### 2. 일기수정
일기 및 수정 버튼 클릭 시 Route path를 통해 고유 ID를 파라미터값으로 전달합니다. 전달받은 ID 파라미터값은 useParams를 이용해 state로 저장하고 일기 데이터 배열 중에 URL ID 파라미터와 일치하는 일기를 렌더링해줍니다

데이터 수정도 일기 생성과 마찬가지로 Context API를 이용해 데이터를 전달 후 localStorage 저장소에 저장합니다.

### 3. 일기삭제
제거할 일기의 ID 값을 Context API를 이용해 데이터를 넘겨준 다음 useReducer를 이용하여 제거할 데이터를 제외한 나머지 데이터를 localStorage 저장소에 배열로 저장합니다.

### 4. 정렬(최신순, 오래된순)
Array.sort 메소드를 사용해서 일기의 date 값을 비교해 정렬 순서를 변경합니다.

### 5. 정렬(전부다, 좋음감정, 안좋은감정)
감정별로 완전 좋음(1) ~ 끔찍함(5)을 기준으로 Array.filter 메소드를 이용해 감정이 3보다 크거나 같을 때 완전 좋음, 좋음, 그럭저럭 3보다 작을 때 나쁨, 끔찍함을 정렬합니다.

### 6. 날짜별 일기 렌더링
렌더링하려는 날짜의 firstDay 즉 해당 연도와 월의 시작일과 lastDay 즉 해당 연도와 월의 마지막 날을 getTime 함수를 이용해 밀리세컨드로 저장합니다. 저장 후 Array.filter 메소드를 이용하여 일기의 date 값이 firstDay보다 크거나 같고 lastDay보다 작거나 같은 일기를 렌더링해 줍니다.

