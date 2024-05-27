import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const ROOT = join(__dirname, '../../')

export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, 'packages'),
  DESIGN: join(ROOT, 'packages', 'lotus-design'),
} as const

export const PLUGINS_SERVER_PORT = 9100
