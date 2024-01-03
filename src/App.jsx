import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { publicRoutes } from "./routes";
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./components/layout";

function App() {
  return (
    <Fragment>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </Fragment>
  );
}

export default App;
