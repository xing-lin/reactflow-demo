import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
  plugins: [react(), tailwindcss()],
});
