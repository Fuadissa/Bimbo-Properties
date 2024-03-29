import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//import router
import HouseContextProvider from "./components/HouseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HouseContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HouseContextProvider>
);
