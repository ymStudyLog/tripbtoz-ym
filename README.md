# 설치

```
git clone https://github.com/Wanted-Pre-Onboarding-FE-Team5/tripbtoz

npm i

npm start

//windows 운영체제에서 npm start 명령어로 json-server 실행이 안될 경우 추가로 아래 명령어 사용
npm run server

//json-server port 설정 = "json-server --watch ./database/database.json --port 8000" 

```

# 기술스택

typescript 
react-router-dom
styled-components 
styled-reset 
json-server
react-query
date-fns
uuid

# 구성

2. 페이지 구분

 - 랜딩 페이지(Landing) : 검색창에서 투숙인원과 투숙기간 선택 후 search -> localStorage에 각각의 정보 저장 후 호텔 페이지로 이동
 
 - 호텔 페이지(Hotel) : localStorage에 저장된 정보를 바탕으로 필터링하여 예약이 가능한 호텔 데이터만 무한스크롤로 10개씩 렌더링, 500ms delay동안 로딩바가 렌더링 됨

 - 예약확인 페이지(Reservation) :  localStorage에 저장된 호텔 정보를 간단하게 display만 하는 페이지

# 수정 과정

수정 진행 중...
