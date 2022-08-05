import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const myQueryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={myQueryClient}>
      <GlobalStyles />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
