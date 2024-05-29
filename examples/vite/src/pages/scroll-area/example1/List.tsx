import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@sensoro-design/react';

export const List = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<number[]>([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ])
  const [height, setHeight] = useState<number | string>(0);

  useEffect(() => {
    setInterval(() => {
      setList((prev) => [1, ...prev,])
    }, 5 * 1000)
  }, [])

  useEffect(() => {
    if (rootRef.current) {
      const targetElement = rootRef.current;

      const contentElement = rootRef.current.querySelector('[data-s-scroll-area-viewport=""]')!.children[0];

      if (contentElement) {
        const resizeObserver = new ResizeObserver(() => {
          const height = targetElement.clientHeight;
          const contentheight = targetElement.scrollHeight;

          if (height < contentheight) {
            setHeight(height)
          }
        });

        resizeObserver.observe(contentElement);
      }
    }
  }, []);

  return (
    <>
      <ScrollArea
        ref={rootRef}
        style={{
          height: height ? height : '100%',
          width: '100%',
        }}
        type="always"
        theme="dark"
      >
        {list.map((_, index) => {
          return (
            <p key={index}>信息占位{index + 1}</p>
          )
        })}
      </ScrollArea>
      </>
  );
};
