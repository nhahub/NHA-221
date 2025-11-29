import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// local version (for development)
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5173,
  },
});
