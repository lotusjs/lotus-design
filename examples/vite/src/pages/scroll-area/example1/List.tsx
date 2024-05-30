import { useEffect, useState } from 'react';
import { ScrollArea } from '@sensoro-design/react';

const { useScrollAreaContext } = ScrollArea;

const AutoHeight = () => {
  const { scrollArea } = useScrollAreaContext('ScrollAreaScrollbar', undefined);

  const handleResize = () => {
    if (scrollArea) {
      scrollArea.style.height = '100%';
      handleResizeObserver();
    }
  }

  const handleResizeObserver = () => {
    if (scrollArea) {
      const height = scrollArea.clientHeight;
      const scrollHeight = scrollArea.scrollHeight;

      if (height < scrollHeight) {
        scrollArea.style.height = height + 'px'
      }
    }
  }

  useEffect(() => {
    if (!scrollArea) return;
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResizeObserver);
    resizeObserver.observe(scrollArea);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.unobserve(scrollArea)
    }
  }, [scrollArea])

  return null;
}

export const List = () => {
  const [list, setList] = useState<number[]>([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setList((prev) => [1, ...prev,])
    }, 2 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <ScrollArea
        style={{
          height: '100%',
          width: '100%',
        }}
        type="always"
        theme="dark"
      >
        <AutoHeight />
        {list.map((_, index) => {
          return (
            <p key={index}>信息占位{index + 1}</p>
          )
        })}
      </ScrollArea>
      </>
  );
};
