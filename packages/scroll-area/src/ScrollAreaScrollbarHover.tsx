import React, { forwardRef, useState, useEffect } from 'react'
import { useScrollAreaContext } from './context'
import { Presence } from './helpers/presence'
import { SCROLLBAR_NAME } from './constants'
import { ScrollAreaScrollbarAuto } from './ScrollAreaScrollbarAuto'
import type { ScrollAreaScrollbarHoverElement, ScopedProps } from './types'
import type { ScrollAreaScrollbarAutoProps } from './ScrollAreaScrollbarAuto'

interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {
  forceMount?: true;
}

export const ScrollAreaScrollbarHover = forwardRef<
  ScrollAreaScrollbarHoverElement,
  ScrollAreaScrollbarHoverProps
>(
  (props: ScopedProps<ScrollAreaScrollbarHoverProps>, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const scrollArea = context.scrollArea;
      let hideTimer = 0;
      if (scrollArea) {
        const handlePointerEnter = () => {
          window.clearTimeout(hideTimer);
          setVisible(true);
        };
        const handlePointerLeave = () => {
          hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
        };
        scrollArea.addEventListener('pointerenter', handlePointerEnter);
        scrollArea.addEventListener('pointerleave', handlePointerLeave);
        return () => {
          window.clearTimeout(hideTimer);
          scrollArea.removeEventListener('pointerenter', handlePointerEnter);
          scrollArea.removeEventListener('pointerleave', handlePointerLeave);
        };
      }
    }, [context.scrollArea, context.scrollHideDelay]);

    return (
      <Presence present={forceMount || visible}>
        <ScrollAreaScrollbarAuto
          data-state={visible ? 'visible' : 'hidden'}
          {...scrollbarProps}
          ref={forwardedRef}
        />
      </Presence>
    );
  }
)
