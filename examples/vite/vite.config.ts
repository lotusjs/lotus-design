import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createStyleImportPlugin,
} from 'vite-plugin-style-import'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lotusDesignDir = join(__dirname, '../../packages/react/src');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@lotus-design/react': lotusDesignDir
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: '@lotus-design/react',
          libraryNameChangeCase: 'pascalCase',
          resolveStyle: (name) => {
            return join(lotusDesignDir, name, 'style')
          },
        },
      ],
    })
  ],
  server: {
    port: 3000
  }
})
