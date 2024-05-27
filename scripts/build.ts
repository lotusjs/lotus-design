import { mkdir } from 'node:fs/promises';
import fs from 'node:fs'
import { join } from 'node:path/posix'
import * as rollup from 'rollup'
import { nextTask } from './helpers/nextTask'
import { getRollupConfig } from './helpers/rollup'
import { buildStyle } from './tasks/buildStyle'
import { buildImportStyleFile } from './tasks/buildImportStyleFile'

import type { Alias } from '@rollup/plugin-alias'

const outdir = 'dist'
const aliases: Alias[] = []
const dir = process.cwd()

async function run() {
  await nextTask('清理之前的构建', async () => {
    const distDir = join(dir, 'dist')
    fs.rmSync(distDir, { recursive: true, force: true })
    await mkdir(outdir, { recursive: true });
  });

  await nextTask('编译组件: CJS、 ESM', async () => {
    // 编译 ts/tsx
    const config = await getRollupConfig({ dir, aliases })
    const build = await rollup.rollup(config)

    const outputs: rollup.OutputOptions[] = Array.isArray(config.output)
      ? config.output
      : [config.output!]

    await Promise.all(outputs.map((output) => build.write(output)))

    // 编译 类型
    const { execa } = await import('execa')

    await execa('pnpm', ['tsc', '--project', 'tsconfig.build.json'], {
      cwd: dir,
      stdio: 'inherit',
    })
    try {
      fs.cpSync(
        join(dir, 'dist', 'types', 'index.d.ts'),
        join(dir, 'dist', 'types', 'index.d.mts'),
      )
    } catch {
      console.log('No .dts file found')
    }

    // 编译样式
    await buildStyle({
      cwd: dir
    })

    //
    // await buildImportStyleFile({
    //   cwd: dir
    // })
  });
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
