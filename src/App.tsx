import React from "react";
import Router from "./router/Router";

const App = () => {
  // React.useEffect(()=> {return () => window.localStorage.clear()}); //TODO 조심해서 쓰기 위치 선정 다시 
  
  return (
    <>
      <Router />
    </>
  );
};

export default App;
