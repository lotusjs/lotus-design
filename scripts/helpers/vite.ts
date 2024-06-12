import { join } from 'node:path';
import { build, type BuildOptions } from 'vite';
import { getEntryFile } from './getEntryFile'

interface Options {
  cwd?: string;
  target?: BuildOptions['target'],
  distDir?: string;
  minify?: boolean;
}

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
};
const external = Object.keys(globals);

export async function viteBuild(options: Options = {}) {
  const {
    target = ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    cwd = process.cwd(),
    distDir = 'dist',
    minify = false,
  } = options;

  const entry = `src/${getEntryFile(join(cwd, 'src'))}`;

  build({
    root: cwd,
    mode: 'production',
    plugins: [],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      target,
      lib: {
        entry,
        name: 'sensoro',
        fileName: () => {
          return !minify ? 'sensoro.development.js' : 'sensoro.production.min.js';
        },
        formats: ['umd'],
      },
      outDir: distDir,
      rollupOptions: {
        external,
        output: {
          globals,
        },
      },
      minify,
    }
  })
}
