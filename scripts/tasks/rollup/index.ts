import { resolve } from 'node:path/posix'
import { buildProject } from './build'

import type { Alias } from '@rollup/plugin-alias'

const aliases: Alias[] = []

export async function main() {
  const cwd = process.cwd()
  const flags = process.argv.slice(2)
  const watch = flags.includes('--watch')
  const clean = flags.includes('--clean')
  const dts = flags.includes('--dts')

  const packageJson = await import(resolve(cwd, 'package.json'))

  await buildProject({
    dir: cwd,
    name: packageJson.name,
    watch,
    clean,
    dts,
    aliases,
  })
}
