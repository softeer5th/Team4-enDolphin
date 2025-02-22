import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ 
      autoCodeSplitting: true,
      routeFileIgnorePrefix: '@',
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }), 
    react(), 
    vanillaExtractPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
      '@components': path.resolve(dirname, 'src/components'),
      '@hooks': path.resolve(dirname, 'src/hooks'),
      '@utils': path.resolve(dirname, 'src/utils'),
      '@theme': path.resolve(dirname, 'src/theme'),
    },
  },
  test: {
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    environment: 'jsdom',
  },
});
