import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    env: {
      JWT_SECRET: 'testsecret123',
      JWT_EXPIRES_IN: '1d',
      NODE_ENV: 'test',
    },
  },
});
