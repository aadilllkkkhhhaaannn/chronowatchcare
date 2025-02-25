import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "https://watch-care.vercel.app/",
        target: "http://localhost:2020",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
