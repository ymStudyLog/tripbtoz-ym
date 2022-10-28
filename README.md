# 팀 프로젝트 tripbtoz 수정

### 원본

- organization repository : https://github.com/Wanted-Pre-Onboarding-FE-Team5/tripbtoz

### 설치

```
git clone https://github.com/ymStudyLog/tripbtoz-ym.git

npm i

npm start

//windows 운영체제에서 npm start 명령어로 json-server 실행이 안될 경우 추가로 아래 명령어 사용
npm run server

```

### 수정 과정(수정 진행 중...)

- 페이지 구분

  - 랜딩 페이지(Landing) : 검색창에서 투숙인원과 투숙기간 선택 후 search -> localStorage에 각각의 정보 저장 후 호텔 페이지로 이동
 
  - 호텔 페이지(Hotel) : localStorage에 저장된 정보를 바탕으로 필터링하여 예약이 가능한 호텔 데이터만 무한스크롤로 10개씩 렌더링, 500ms delay동안 로딩바가 렌더링 됨

  - 예약확인 페이지(Reservation) :  localStorage에 저장된 호텔 정보를 간단하게 display만 하는 페이지

#### ==> 수정 이후

- 라우팅 수정

  - Nested Routes : 중첩 라우팅을 적용해서 Presentational 부분과 기능 부분을 최대한 분리했다.

- 페이지 구분

  - 기본 레이아웃 페이지(LayoutPage) : 기능이 없는 레이아웃들과 SearchBar 컴포넌트를 포함하는 기본 페이지. 이 페이지에서 우선 localStorage를 체크한 후 그 결과를 중첩 라우팅된 하위 컴포넌트 Outlet과 SearchBar 컴포넌트에 전달한다. 모든 레이아웃은 기본적으로 모바일 반응형이 되도록 구현했다.

  - 중첩 라우팅 Outlet에 연결된 페이지들 :

    - 랜딩 페이지(Landing) : 기능은 따로 없는 페이지.

    - 호텔 페이지(Hotel) : LayoutPage로부터 props로 넘겨받은 currentValue(투숙기간, 투숙인원)로 호텔 데이터를 불러올 수 있는 쿼리 스트링을 생성해서 하위 컴포넌트 HotelList에 전달함. SearchBar 컴포넌트 삭제&독립시켜서 Hotel 페이지에서도 자유롭게 검색 옵션을 변경해서 다시 호텔 데이터를 찾아볼 수 있게 되었다.

    - 예약확인 페이지(Reservation) : database에 저장되어있는 예약정보(reservations)를 보여주는 페이지. 예약을 취소할 수 있는 버튼도 추가로 구현.

- 그 외

  - localStorage : 오로지 SearchBar 컴포넌트에서 사용자가 선택하는 값만 저장한다.

  - database : localStorage 데이터도 database에 저장해서 react-query로 다뤄보려고 했던 이전 로직을 전부 폐기. localStorage 데이터는 서버에 필요없다고 판단해서 아예 삭제시키고, 예약 정보(reservations)만 저장하는 것으로 변경.

  - 검색창(SearchBar 컴포넌트)을 페이지로부터 독립시킴 : SearchBar 컴포넌트를 pathname에 따라 다른 레이아웃을 보이게 수정해서 기존에 존재하던 페이지들로부터 독립시켜 자유롭게 재사용 및 이동이 가능하도록 함. + 추가로 useStayPeriod, useHeadCount 커스텀 hook을 만들어서 코드 길이를 단축시킴.

### 향후 수정 계획

- HotelList, HotelItem, useInfiniteScroll 수정 예정 : 사용자가 선택한 옵션 값으로 만든 쿼리 스트링을 전달하는 것 까지는 수정에 성공했으나, 쿼리 스트링에 따른 호텔 정보를 보여주지 못함. 정확히는 윈도우 창에서 한번 포커스 아웃되어야 올바른 쿼리 스트링에 따른 데이터가 보여지게 변함. 


:eyes: _Go back to github profile to check the other repositories_ :eyes:
[![github-profile](https://img.shields.io/badge/Github-Profile-blue?style=flat&logo=Git&logoColor=F05032)](https://github.com/ymStudyLog?tab=repositories)
