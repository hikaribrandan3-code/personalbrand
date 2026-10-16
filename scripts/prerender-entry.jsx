import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";
import MobilePortfolio from "../src/MobilePortfolio";
import { projectData, macApps } from "../src/projectData";
import { LanguageProvider } from "../src/i18n";

export { projectData, macApps };
export function renderHome() {
  const desktop = renderToStaticMarkup(<LanguageProvider><App /></LanguageProvider>);
  const mobile = renderToStaticMarkup(<LanguageProvider><MobilePortfolio onOpen={() => {}} /></LanguageProvider>);
  // Breakpoint-scoped head preloads already prioritize the correct hero. Hidden
  // responsive variants must not trigger React's unconditional image preloads.
  const deferImages = (markup) => markup.replace(/<link\b[^>]*rel="preload"[^>]*\/>/g, "")
    .replace(/<img\b([^>]*?)\/>/g, (_match, attrs) => `<img${attrs.replace(/ loading="[^"]*"/g, "")} loading="lazy"/>`);
  return `<div class="prerender-desktop">${deferImages(desktop)}</div><div class="prerender-mobile">${deferImages(mobile)}</div>`;
}
