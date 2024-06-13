import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useScrollAreaContext } from '../context';
import { useComposedRefs } from '../../compose-refs';
import { SCROLLBAR_NAME } from '../constants';
import {
  getThumbSize,
  isScrollingWithinScrollbarBounds,
  toInt,
} from '../utils';
import type {
  ScopedProps,
  ScrollAreaScrollbarAxisElement,
  ScrollAreaScrollbarAxisProps,
} from '../types';
import { ScrollAreaScrollbarImpl } from './ScrollAreaScrollbarImpl';

export const ScrollAreaScrollbarY = forwardRef<
  ScrollAreaScrollbarAxisElement,
  ScrollAreaScrollbarAxisProps
>((props: ScopedProps<ScrollAreaScrollbarAxisProps>, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();
  const ref = useRef<ScrollAreaScrollbarAxisElement>(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);

  useEffect(() => {
    if (ref.current)
      setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);

  return (
    <ScrollAreaScrollbarImpl
      data-orientation="vertical"
      {...scrollbarProps}
      ref={composeRefs}
      sizes={sizes}
      style={{
        top: 0,
        right: context.dir === 'ltr' ? 0 : undefined,
        left: context.dir === 'rtl' ? 0 : undefined,
        bottom: 'var(--lotus-scroll-area-corner-height)',
        ['--lotus-scroll-area-thumb-height' as any]: `${getThumbSize(sizes)}px`,
        ...props.style,
      }}
      onThumbPointerDown={pointerPos => props.onThumbPointerDown(pointerPos.y)}
      onDragScroll={pointerPos => props.onDragScroll(pointerPos.y)}
      onWheelScroll={(event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          // prevent window scroll when wheeling on scrollbar
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      }}
      onResize={() => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom),
            },
          });
        }
      }}
    />
  );
});
