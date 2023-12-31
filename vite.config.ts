import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
//https://blogapi-vbdw.onrender.com
// http://localhost:5000
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    proxy: {
      '/api': {
           target: 'https://blogapi-vbdw.onrender.com',
           changeOrigin: true,
           secure: false,      
           ws: true,
       }
  }
  },
});