import React from "react";
import ReactDOM from "react-dom/client";
import MotionPreferenceProvider from "./MotionPreferenceProvider";
import PortfolioRoot from "./PortfolioRoot";
import "./styles.css";
import "./polish.css";
// Keep the prerendered desktop visible while its existing deferred bundle loads.
// The mobile path still downloads only the mobile entry and lazy notes drawer.
const Portfolio = window.matchMedia("(max-width: 767px)").matches
  ? PortfolioRoot
  : (await import("./App")).default;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionPreferenceProvider>
      <Portfolio />
    </MotionPreferenceProvider>
  </React.StrictMode>,
);
