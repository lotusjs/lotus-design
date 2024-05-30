import { AspectRatio } from '@sensoro-design/react'
import styles from './basic.module.less'

const AspectRatioDemo = () => (
  <div className={styles.container}>
    <AspectRatio ratio={16 / 9}>
      <img
        className={styles.image}
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
      />
    </AspectRatio>
  </div>
);

export default AspectRatioDemo;
