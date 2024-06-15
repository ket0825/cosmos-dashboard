import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    define: {
      'process.env': env,
    },    
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  };
});