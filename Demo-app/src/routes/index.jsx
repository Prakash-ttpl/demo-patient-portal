import React from "react";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./Routes";

const index = () => {
  return (
    <React.Fragment>
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route
            key={"app-route-" + index}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default index;
