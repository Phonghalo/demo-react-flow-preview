import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Some hosts (e.g. CodeSandbox) fail on package#exports subpaths; point at dist file.
      'react-flow-preview/client-image': path.resolve(
        dirname,
        'node_modules/react-flow-preview/dist/client-image.js',
      ),
    },
  },
  server: {
    host: true,
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    strictPort: false,
  },
});
