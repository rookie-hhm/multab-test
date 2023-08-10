import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import path from 'path'

export default defineConfig(() => {
  return {
    plugins: [vue(), vueJsx()],
    build: {
      rollupOptions: {
        input: path.resolve(__dirname, 'src/index.js'),
        preserveModules: true,
        output: [
          
        ]
      }
    }
  }
})