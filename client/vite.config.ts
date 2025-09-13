import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), svgr()],
  preview: {
    host: true,
    port: Number(process.env.PORT) || 5173, // если PORT не задан, используем 5173
    allowedHosts: ["flowerdeliveryapp-production-0e48.up.railway.app"],
  },
});
