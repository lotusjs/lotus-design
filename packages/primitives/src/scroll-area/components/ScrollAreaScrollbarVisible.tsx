import React, { forwardRef, useRef, useState } from 'react';
import { useScrollAreaContext } from '../context';
import { getScrollPositionFromPointer, getThumbOffsetFromScroll, getThumbRatio } from '../utils';
import type {
  Direction,
  ScopedProps,
  ScrollAreaScrollbarAxisPrivateProps,
  ScrollAreaScrollbarAxisProps,
  ScrollAreaScrollbarVisibleElement,
  ScrollAreaThumbElement,
  Sizes,
} from '../types';
import { ScrollAreaScrollbarX } from './ScrollAreaScrollbarX';
import { ScrollAreaScrollbarY } from './ScrollAreaScrollbarY';

const SCROLLBAR_NAME = 'ScrollAreaScrollbar';

type UncommonProps = 'onThumbPositionChange' | 'onDragScroll' | 'onWheelScroll';
export interface ScrollAreaScrollbarVisibleProps
  extends Omit<ScrollAreaScrollbarAxisProps, keyof ScrollAreaScrollbarAxisPrivateProps> {
  orientation?: 'horizontal' | 'vertical';
}

export const ScrollAreaScrollbarVisible = forwardRef<
  ScrollAreaScrollbarVisibleElement,
  ScrollAreaScrollbarVisibleProps
>(
  (props: ScopedProps<ScrollAreaScrollbarVisibleProps>, forwardedRef) => {
    const { orientation = 'vertical', ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const thumbRef = useRef<ScrollAreaThumbElement | null>(null);
    const pointerOffsetRef = useRef(0);
    const [sizes, setSizes] = useState<Sizes>({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
    });
    const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);

    const commonProps: Omit<ScrollAreaScrollbarAxisPrivateProps, UncommonProps> = {
      ...scrollbarProps,
      sizes,
      onSizesChange: setSizes,
      hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
      onThumbChange: thumb => (thumbRef.current = thumb),
      onThumbPointerUp: () => (pointerOffsetRef.current = 0),
      onThumbPointerDown: pointerPos => (pointerOffsetRef.current = pointerPos),
    };

    function getScrollPosition(pointerPos: number, dir?: Direction) {
      return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
    }

    if (orientation === 'horizontal') {
      return (
        <ScrollAreaScrollbarX
          {...commonProps}
          ref={forwardedRef}
          onThumbPositionChange={() => {
            if (context.viewport && thumbRef.current) {
              const scrollPos = context.viewport.scrollLeft;
              const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
              thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
            }
          }}
          onWheelScroll={(scrollPos) => {
            if (context.viewport)
              context.viewport.scrollLeft = scrollPos;
          }}
          onDragScroll={(pointerPos) => {
            if (context.viewport) {
              context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
            }
          }}
        />
      );
    }

    if (orientation === 'vertical') {
      return (
        <ScrollAreaScrollbarY
          {...commonProps}
          ref={forwardedRef}
          onThumbPositionChange={() => {
            if (context.viewport && thumbRef.current) {
              const scrollPos = context.viewport.scrollTop;
              const offset = getThumbOffsetFromScroll(scrollPos, sizes);
              thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
          }}
          onWheelScroll={(scrollPos) => {
            if (context.viewport)
              context.viewport.scrollTop = scrollPos;
          }}
          onDragScroll={(pointerPos) => {
            if (context.viewport)
              context.viewport.scrollTop = getScrollPosition(pointerPos);
          }}
        />
      );
    }

    return null;
  },
);
