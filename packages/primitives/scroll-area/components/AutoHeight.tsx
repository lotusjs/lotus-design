import { useEffect } from 'react'
import { useScrollAreaContext } from '../context'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import type { ScopedProps } from '../types'

interface AutoHeightProps {}

export const AutoHeight = (props: ScopedProps<AutoHeightProps>) => {
  const context = useScrollAreaContext('ScrollAreaScrollbar', props.__scopeScrollArea)

  const onResize = () => {
    if (context.scrollArea) {
      context.scrollArea.style.height = '100%';
      const height = context.scrollArea.clientHeight;
      const scrollHeight = context.scrollArea.scrollHeight;

      if (height < scrollHeight) {
        context.scrollArea.style.height = height + 'px'
      }
    }
  }

  useResizeObserver(context.scrollArea, onResize)

  useEffect(() => {
    if (context.scrollArea) {
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
      }
    }
  }, [context.scrollArea])

  return null;
}
