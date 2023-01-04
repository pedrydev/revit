import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import compression from 'vite-plugin-compression';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './environment');

  if (mode === 'production') {
    process.env = { ...process.env, ...env };
  }

  const htmlEnvPlugin = () => {
    return {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/%(.*?)%/g, function (_, p1) {
          return env[p1];
        });
      },
    };
  };

  return {
    build: {
      manifest: true,
      target: 'esnext',
    },
    css: {
      devSourcemap: mode !== 'production',
    },
    envDir: 'environment',
    plugins: [
      compression(),
      eslint({
        cache: false,
        failOnWarning: false,
        include: ['src'],
      }),
      htmlEnvPlugin(),
      react(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
    server: {
      cors: true,
      open: true,
    },
    test: {
      clearMocks: true,
      environment: 'happy-dom',
      include: ['./src/**/*.test.{ts,tsx}'],
      setupFiles: ['./test/setupTests.ts'],
    },
  };
});
