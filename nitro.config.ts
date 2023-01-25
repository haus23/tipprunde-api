import { defineNitroConfig } from 'nitropack';

export default defineNitroConfig({
  srcDir: './src',
  storage: {
    db: {
      driver: 'fs',
      base: './data',
    },
  },
});
