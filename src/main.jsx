import React from "react";
import ReactDOM from "react-dom/client";
import MotionPreferenceProvider from "./MotionPreferenceProvider";
import App from "./App";
import "./styles.css";
import "./polish.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionPreferenceProvider>
      <App />
    </MotionPreferenceProvider>
  </React.StrictMode>,
);
