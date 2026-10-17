import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function staticUgcPage() {
  return {
    name: "static-ugc-page",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.split("?")[0] === "/ugc-for-ai-startups") {
          req.url = req.url.replace("/ugc-for-ai-startups", "/ugc-for-ai-startups.html");
        }
        next();
      });
    },
  };
}

export default defineConfig({ plugins: [react(), staticUgcPage()] });
