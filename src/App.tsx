import React from "react";
import Router from "./router/Router";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation().pathname;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <Router />;
};

export default App;
