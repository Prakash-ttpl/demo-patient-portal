import React from "react";
import { MAIN_ROUTES } from "../routes/Routes";
import { Route, Routes } from "react-router-dom";
import Dataloader from "../containers/Wrappers/Dataloader/Dataloader";
function MainApp() {
  return (
    <>
      <Dataloader>
        <div className="h-screen sozen-scrollbar overflow-y-auto ">
          <Routes>
            {MAIN_ROUTES.map((route, index) => (
              <Route
                key={"main-route-" + index}
                path={route.path}
                element={route.component}
              />
            ))}
          </Routes>
        </div>
      </Dataloader>
    </>
  );
}

export default MainApp;
