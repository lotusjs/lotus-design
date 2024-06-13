import React, { forwardRef, useEffect, useRef } from 'react';
import { useScrollAreaContext, useScrollbarContext } from '../context';
import { THUMB_NAME } from '../constants';
import { Primitive, composeEventHandlers } from '../../primitive';
import { useDebounceCallback } from '../../hooks/useDebounceCallback';
import { useComposedRefs } from '../../compose-refs';
import { addUnlinkedScrollListener } from '../utils';
import type {
  PrimitiveDivProps,
  ScopedProps,
  ScrollAreaThumbImplElement,
} from '../types';

export interface ScrollAreaThumbImplProps extends PrimitiveDivProps {}

export const ScrollAreaThumbImpl = forwardRef<ScrollAreaThumbImplElement, ScrollAreaThumbImplProps>(
  (props: ScopedProps<ScrollAreaThumbImplProps>, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(forwardedRef, node =>
      scrollbarContext.onThumbChange(node));
    const removeUnlinkedScrollListenerRef = useRef<() => void>();
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = undefined;
      }
    }, 100);

    useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        /**
         * We only bind to native scroll event so we know when scroll starts and ends.
         * When scroll starts we start a requestAnimationFrame loop that checks for
         * changes to scroll position. That rAF loop triggers our thumb position change
         * when relevant to avoid scroll-linked effects. We cancel the loop when scroll ends.
         * https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
         */
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener('scroll', handleScroll);
        return () => viewport.removeEventListener('scroll', handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);

    return (
      <Primitive.div
        data-state={scrollbarContext.hasThumb ? 'visible' : 'hidden'}
        {...thumbProps}
        ref={composedRef}
        style={{
          width: 'var(--lotus-scroll-area-thumb-width)',
          height: 'var(--lotus-scroll-area-thumb-height)',
          ...style,
        }}
        onPointerDownCapture={composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target as HTMLElement;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        })}
        onPointerUp={composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)}
      />
    );
  },
);
