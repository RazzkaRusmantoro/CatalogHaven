import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: './', // Adjust this path if your index.html is in a different location
  plugins: [react()],
});
