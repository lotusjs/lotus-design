import { resolve } from 'node:path'
import alias, { Alias } from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { preserveDirectives } from 'rollup-plugin-preserve-directives'
import glob from 'fast-glob'

import type { Plugin, RollupOptions } from 'rollup'

interface Options {
  dir: string
  aliases?: Alias[],
  source?: glob.Pattern | glob.Pattern[]
}

export async function getRollupConfig(options: Options): Promise<RollupOptions> {
  const {
    dir,
    aliases = [],
    source = [
      'src/**/*.{ts,tsx}'
    ]
  } = options

  const packageJson = await import(resolve(dir, 'package.json'))

  const isCli = packageJson.bin !== undefined

  const plugins: Plugin[] = [
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }),
    alias({ entries: aliases }),
    esbuild({
      sourceMap: true,
      tsconfig: resolve(dir, 'tsconfig.json'),
      platform: isCli ? 'node' : 'browser',
    }),
    replace({ preventAssignment: true }),
    postcss({
      extract: true,
      extensions: ['.less', 'css'],
      plugins: [
        autoprefixer({
          overrideBrowserslist: 'iOS >= 10, Chrome >= 49',
        }),
      ],
    }),
    preserveDirectives(),
    {
      name: '@rollup-plugin/remove-empty-chunks',
      generateBundle(_, bundle) {
        for (const [name, chunk] of Object.entries(bundle)) {
          if (chunk.type === 'chunk' && chunk.code.length === 0) {
            delete bundle[name]
          }
        }
      },
    },
  ]

  const deps = [
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]

  const external = new RegExp(`^(${deps.join('|')})`)

  const entries = await glob(source, {
    ignore: [
      'src/**/style/*.ts'
    ]
  })

  const outputs: RollupOptions['output'] = [
    {
      format: 'es',
      exports: 'named',
      entryFileNames: '[name].mjs',
      dir: resolve(dir, 'dist/esm'),
      preserveModules: true,
    },
  ]

  if (!isCli) {
    outputs.push({
      format: 'cjs',
      exports: 'named',
      entryFileNames: '[name].cjs',
      dir: resolve(dir, 'dist/cjs'),
      preserveModules: true,
    })
  }

  return {
    input: entries,
    onLog(level, log, handler) {
      if (log.code === 'EMPTY_BUNDLE') return
      return handler(level, log)
    },
    onwarn(warning, warn) {
      if (warning.code === 'SOURCEMAP_ERROR') return
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
      warn(warning)
    },
    output: outputs,
    external,
    plugins,
  }
}