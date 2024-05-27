import { main as build } from './tasks/rollup'
import { buildStyle } from './tasks/style'

(async () => {
  build()
  buildStyle()
})();
