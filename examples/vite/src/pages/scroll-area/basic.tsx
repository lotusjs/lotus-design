import { ScrollArea } from '@sensoro-design/react'
import { Tags } from './components/Tags'
import { Cards } from './components/Cards'
import styles from './basic.module.less'

const Basic = () => {
  return (
    <>
      <ScrollArea type="always" className={styles.root}>
        <Tags />
      </ScrollArea>
      <br />

      <ScrollArea type="always" size="small" className={styles.root}>
        <Tags />
      </ScrollArea>
      <br />

      <ScrollArea type="always" theme="dark" className={styles.root} style={{ backgroundColor: 'rgba(26, 38, 61, 0.85)' }}>
        <Tags />
      </ScrollArea>
      <br />

      <ScrollArea type="always" theme="dark" size="small" className={styles.root} style={{ backgroundColor: 'rgba(26, 38, 61, 0.85)' }}>
        <Tags />
      </ScrollArea>
      <br />

      <ScrollArea type="always" className={styles.root} style={{ height: 'auto' }}>
        <Cards />
      </ScrollArea>
    </>
  )
}

export default Basic;

