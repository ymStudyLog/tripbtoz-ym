import Router from "./router/Router";
import DefaultLayout from "./layout/DefaultLayout";

const App = () => {
  return (
    <DefaultLayout>
      <Router />
    </DefaultLayout>
  );
};

export default App;
