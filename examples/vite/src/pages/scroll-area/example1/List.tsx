import { useEffect, useState } from 'react';
import { ScrollArea } from '@sensoro-design/react';

export function List() {
  const [list, setList] = useState<number[]>([
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setList(prev => [1, ...prev]);
    }, 2 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ScrollArea
      style={{
        height: '100%',
        width: '100%',
      }}
      type="always"
      theme="dark"
    >
      <ScrollArea.AutoHeight />
      {list.map((_, index) => {
        return (
          <p key={index}>
            信息占位
            {index + 1}
          </p>
        );
      })}
    </ScrollArea>
  );
}
