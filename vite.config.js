import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173, // Ensure this is correct
  },
  preview: {
    port: 10000, // Ensure it matches Render's assigned port
    allowedHosts: ['socialhubfrontend.onrender.com'] // ✅ Add this line
  }
});
