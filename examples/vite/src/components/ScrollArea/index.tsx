import { ScrollArea } from '@sensoro-design/react'
import styles from './index.module.less'

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export default () => {
  return (
    <>
      <ScrollArea type="always" className={styles.root}>
        <div className={styles.content}>
          <div className={styles.text}>Tags</div>
          {TAGS.map((tag) => (
            <div className={styles.tag} key={tag}>
              {tag}
              <div className={styles.separator}></div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}

