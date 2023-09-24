import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { env } from 'node:process';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminGifSicle from 'imagemin-gifsicle';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngQuant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';
import { splitVendorChunkPlugin } from 'vite';

const isDev = env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      react(),
      splitVendorChunkPlugin(),
      viteImagemin({
         plugins: {
            jpg: imageminMozjpeg(),
            png: imageminPngQuant(),
            gif: imageminGifSicle(),
            svg: imageminSvgo(),
         },
         makeWebp: {
            plugins: {
               jpg: imageminWebp(),
               png: imageminWebp(),
            },
         },
      }),
   ],
   css: {
      devSourcemap: true,
      modules: {
         generateScopedName: isDev
            ? '[name]_[local]__[hash:base64:5]'
            : '[hash:base64:4]',
      },
   },
   resolve: {
      alias: {
         '@': resolve(__dirname, './src'),
      },
   },
   // 빌드 시, 청크 파일 생성 매뉴얼 구성
   build: {
      rollupOptions: {
         output: {
            manualChunks: {
               react: ['react', 'react-dom'],
               reactRouter: ['react-router-dom'],
               animations: ['gsap'],
            },
         },
      },
    terserOptions: {
      comments: false,
    },
   },
});