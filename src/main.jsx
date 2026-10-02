import React from "react";
import ReactDOM from "react-dom/client";
import MotionPreferenceProvider from "./MotionPreferenceProvider";
import PortfolioRoot from "./PortfolioRoot";
import "./styles.css";
import "./polish.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionPreferenceProvider>
      <PortfolioRoot />
    </MotionPreferenceProvider>
  </React.StrictMode>,
);
