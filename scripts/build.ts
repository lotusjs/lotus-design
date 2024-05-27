import { main as build } from './tasks/build'

(async () => {
  build().catch((err) => {
    console.error(err)
    process.exit(1)
  })
})();
