import { ScrollArea } from './components'

export const App = () => {
  return (
    <>
      <ScrollArea />
      <br />

      <ScrollArea size="small" />
      <br />

      <ScrollArea theme="dark" style={{ backgroundColor: 'rgba(26, 38, 61, 0.85)' }} />
      <br />

      <ScrollArea size="small" theme="dark" style={{ backgroundColor: 'rgba(26, 38, 61, 0.85)' }} />
      <br />
    </>
  )
}

