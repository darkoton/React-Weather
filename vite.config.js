import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
const __dirname = path.resolve();
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ` // just variables loaded globally
          @import "./src/assets/style/config/production";`,
      },
    },
  },
});
