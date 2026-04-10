import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mockServer from 'vite-plugin-mock-server';
import { viteStaticCopy } from 'vite-plugin-static-copy';
// import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouter({
    //   target: 'react',
    //   autoCodeSplitting: true,
    // }),
    react(),
    mockServer({
      mockRootDir: './mock',
      logLevel: 'info',
      urlPrefixes: ['/builders', '/api'],
      middlewares: [
        cookieParser(),
        bodyParser.json({limit: '50mb'}),
        bodyParser.urlencoded(),
        bodyParser.text(),
        bodyParser.raw()
      ],
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'scripts',
          dest: '.'
        },
        {
          src: 'libs',
          dest: '.'
        },
      ]
    }),
  ],
  // server: {
  //   port: 5999, //  đổi cổng
  //   open: true, // tự mở trình duyệt
  //   host: "localhost", // hoặc "0.0.0.0" nếu cần truy cập LAN
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src"),
      "@apps": path.resolve(__dirname, "src/apps"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@utils": path.resolve(__dirname, "src/shared/utils"),
      "@types": path.resolve(__dirname, "src/shared/types"),
      "@components": path.resolve(__dirname, "src/shared/components"),
      "@hooks": path.resolve(__dirname, "src/shared/hooks"),
      "@services": path.resolve(__dirname, "src/shared/services"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@packages": path.resolve(__dirname, "./packages"),
    },
  },
  // build: {
  //   chunkSizeWarningLimit: 1000, // đơn vị KB, ví dụ 1000 KB = 1MB default 500kb
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           if (id.includes('react')) {
  //             return 'vendor_react';
  //           }
  //           return 'vendor';
  //         }
  //       }
  //     }
  //   }
  // }
});
