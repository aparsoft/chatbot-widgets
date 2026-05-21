import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/*/src/**/*.test.{js,ts,tsx}'],
  },
  resolve: {
    alias: {
      // Angular source imports are mocked in tests, prevent resolution errors
      '@angular/core': new URL('./test-stubs/angular-core.js', import.meta.url).pathname,
      '@angular/common': new URL('./test-stubs/angular-common.js', import.meta.url).pathname,
    },
  },
});
