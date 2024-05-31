import fs from 'node:fs'
import { join } from 'node:path'
import * as rollup from 'rollup'
import { nextTask } from './helpers/nextTask'
import { getRollupConfig } from './helpers/rollup'
import { buildStyle } from './tasks/buildStyle'
import { buildImportStyleFile } from './tasks/buildImportStyleFile'

import type { Alias } from '@rollup/plugin-alias'

const cwd = process.cwd()
const esDir = 'es';
const libDir = 'lib';
const distDir = 'dist';

function getProjectPath(...filePath: string[]) {
  return join(cwd, ...filePath);
}

const aliases: Alias[] = []

async function run() {
  await nextTask('清理之前的构建', async () => {
    await Promise.all([[getProjectPath(esDir), getProjectPath(libDir), getProjectPath(distDir)].map(dir => fs.rmSync(dir, { recursive: true, force: true }))])
  });

  await nextTask('编译组件: CJS、 ESM', async () => {
    // 编译 ts/tsx
    const config = await getRollupConfig({
      cwd,
      esDir,
      libDir,
      aliases
    })
    const build = await rollup.rollup(config)

    const outputs: rollup.OutputOptions[] = Array.isArray(config.output)
      ? config.output
      : [config.output!]

    await Promise.all(outputs.map((output) => build.write(output)))

    // 编译 类型
    const { execa } = await import('execa')

    await execa('pnpm', ['tsc', '--project', 'tsconfig.build.json'], {
      cwd,
      stdio: 'inherit',
    })
    try {
      fs.cpSync(
        join(cwd, 'types', 'index.d.ts'),
        join(cwd, 'types', 'index.d.mts'),
      )
    } catch {
      console.log('No .dts file found')
    }

    // 编译样式
    await buildStyle({
      cwd,
      esDir,
      libDir,
    })

    //
    await buildImportStyleFile({
      cwd,
      esDir,
      libDir,
    })
  });
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
