import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(), // Automatically syncs @/ aliases from tsconfig.json
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // Ensures CSS and assets don't break tests
    css: true,
    exclude: ['**/cypress/**']
  },
});