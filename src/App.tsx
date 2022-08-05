import React from "react";
import Router from "./router/Router";

const App = () => {
  // React.useEffect(()=> {return () => window.localStorage.clear()}); //TODO 조심해서 쓰기 위치 선정 다시 -> 랜딩 페이지로 돌아가는 버튼 만들고 그 버튼 click 이벤트에 달기 
  
  return (
    <>
      <Router />
    </>
  );
};

export default App;
