import { build } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const outDir = 'dist';
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
};
const external = Object.keys(globals);

(async () => {
  build({
    plugins: [
      tsconfigPaths(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'lotus',
        fileName: 'lotus-design',
        formats: ['umd'],
      },
      outDir,
      rollupOptions: {
        external,
        output: {
          globals,
        },
      },
      minify: false,
      cssCodeSplit: false,
    },
  })
})();
