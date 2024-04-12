import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
import svgr from 'vite-plugin-svgr';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    react(),
    svgr(),
  ],
  server: {
    port: 443,
    host: '0.0.0.0',
    hmr: {
      host: 'architecton.local',
      port: 443,
    },
    https: {
      key: fs.readFileSync('./.cert/cert.key'),
      cert: fs.readFileSync('./.cert/cert.crt'),
    },
  },
});
