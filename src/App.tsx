import React from "react";
import Router from "./router/Router";
import { useLocation } from  "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";

const App = () => {
  const location = useLocation();
  React.useEffect(()=>{
    window.scrollTo(0,0);
  },[location])
  
  return (
    <DefaultLayout>
      <Router />
    </DefaultLayout>
  );
};

export default App;
