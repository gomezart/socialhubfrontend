export default defineConfig({
  server: {
    port: 10000, // Change this to the correct port
    host: "0.0.0.0" // Ensure it binds to all network interfaces
  },
  preview: {
    port: 10000, // Ensure the preview mode uses the same port
    host: "0.0.0.0"
  }
});
