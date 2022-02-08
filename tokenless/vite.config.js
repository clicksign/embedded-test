import { resolve } from 'path';
import { defineConfig } from 'vite';

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        tokenless: resolve(__dirname, 'tokenless/index.html')
      }
    }
  }
})