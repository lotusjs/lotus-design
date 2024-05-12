import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { useScrollAreaContext } from './context'
import { useComposedRefs } from './helpers/composeRefs'
import { SCROLLBAR_NAME } from './constants'
import { ScrollAreaScrollbarImpl } from './ScrollAreaScrollbarImpl'
import {
  getThumbSize,
  isScrollingWithinScrollbarBounds,
  toInt,
} from './utils'
import type {
  ScopedProps,
  ScrollAreaScrollbarAxisElement,
  ScrollAreaScrollbarAxisProps
} from './types'

export const ScrollAreaScrollbarX = forwardRef<
  ScrollAreaScrollbarAxisElement,
  ScrollAreaScrollbarAxisProps
>((props: ScopedProps<ScrollAreaScrollbarAxisProps>, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();
  const ref = useRef<ScrollAreaScrollbarAxisElement>(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);

  useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);

  return (
    <ScrollAreaScrollbarImpl
      data-orientation="horizontal"
      {...scrollbarProps}
      ref={composeRefs}
      sizes={sizes}
      style={{
        bottom: 0,
        left: context.dir === 'rtl' ? 'var(--radix-scroll-area-corner-width)' : 0,
        right: context.dir === 'ltr' ? 'var(--radix-scroll-area-corner-width)' : 0,
        ['--radix-scroll-area-thumb-width' as any]: getThumbSize(sizes) + 'px',
        ...props.style,
      }}
      onThumbPointerDown={(pointerPos) => props.onThumbPointerDown(pointerPos.x)}
      onDragScroll={(pointerPos) => props.onDragScroll(pointerPos.x)}
      onWheelScroll={(event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
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
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight),
            },
          });
        }
      }}
    />
  )
})
