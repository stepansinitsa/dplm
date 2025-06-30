import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
});