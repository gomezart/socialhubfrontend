import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000, // Change this if necessary
    host: "0.0.0.0",
  },
  preview: {
    port: 10000,
    host: "0.0.0.0",
  },
});
