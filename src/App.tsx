import React from "react";
import Router from "./router/Router";
import { useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  const myQueryClient = new QueryClient({
    defaultOptions:{
        queries: { refetchOnWindowFocus: false },
    },
  });
  
  const location = useLocation().pathname;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return(
    <QueryClientProvider client={myQueryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
