import React, { forwardRef, useState } from 'react';
import { useResizeObserver } from '@rcuse/core';
import { useScrollAreaContext } from '../context';
import { SCROLLBAR_NAME } from '../constants';
import { Presence } from '../../presence';
import { useDebounceCallback } from '../../hooks/useDebounceCallback';
import type {
  ScopedProps,
  ScrollAreaScrollbarAutoElement,
} from '../types';
import { ScrollAreaScrollbarVisible } from './ScrollAreaScrollbarVisible';
import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible';

export interface ScrollAreaScrollbarAutoProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export const ScrollAreaScrollbarAuto = forwardRef<
  ScrollAreaScrollbarAutoElement,
  ScrollAreaScrollbarAutoProps
>(
  (props: ScopedProps<ScrollAreaScrollbarAutoProps>, forwardedRef) => {
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { forceMount, ...scrollbarProps } = props;
    const [visible, setVisible] = useState(false);
    const isHorizontal = props.orientation === 'horizontal';
    const handleResize = useDebounceCallback(() => {
      if (context.viewport) {
        const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
        const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
        setVisible(isHorizontal ? isOverflowX : isOverflowY);
      }
    }, 10);

    useResizeObserver(context.viewport, handleResize);
    useResizeObserver(context.content, handleResize);

    return (
      <Presence present={forceMount || visible}>
        <ScrollAreaScrollbarVisible
          data-state={visible ? 'visible' : 'hidden'}
          {...scrollbarProps}
          ref={forwardedRef}
        />
      </Presence>
    );
  },
);
