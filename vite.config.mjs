import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',  // Specify the output directory if not already set
    rollupOptions: {
      input: '/src/main.jsx',  // Point to the main entry file
    },
  },
});
