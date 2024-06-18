import styles from './index.module.less';

const list = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export function Cards() {
  return (
    <div className={styles.content}>
      {list.map(tag => (
        <div className={styles.card} key={tag}>
        </div>
      ))}
    </div>
  );
}
