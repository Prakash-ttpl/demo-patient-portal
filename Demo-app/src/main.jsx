import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { BrowserRouter } from "react-router-dom";

const globalStyles = {
   fontFamily: "'Inter', sans-serif",
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <div id="main-app-container" style={globalStyles}>
        <App />
      </div>
    </BrowserRouter>
  </Provider>
);
