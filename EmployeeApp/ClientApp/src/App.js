import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import "./custom.css";
import { AppContext } from "./store/app-context";

const App = () => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.getDepartments();
  }, [appContext.addNew]);

  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </Layout>
  );
};

export default App;
