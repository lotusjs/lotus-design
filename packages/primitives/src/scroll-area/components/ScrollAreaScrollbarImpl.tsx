import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '@rcuse/core';
import { Primitive } from '../../primitive';
import { SCROLLBAR_NAME } from '../constants';
import { ScrollbarProvider, useScrollAreaContext } from '../context';
import { useComposedRefs } from '../../compose-refs';
import { useCallbackRef } from '../../hooks/useCallbackRef';
import { useDebounceCallback } from '../../hooks/useDebounceCallback';
import { composeEventHandlers } from '../utils';
import type {
  PrimitiveDivProps,
  ScopedProps,
  ScrollAreaScrollbarElement,
  ScrollAreaScrollbarImplElement,
  ScrollAreaScrollbarImplPrivateProps,
} from '../types';

interface ScrollAreaScrollbarImplProps
  extends Omit<PrimitiveDivProps, keyof ScrollAreaScrollbarImplPrivateProps>,
  ScrollAreaScrollbarImplPrivateProps {}

export const ScrollAreaScrollbarImpl = forwardRef<
  ScrollAreaScrollbarImplElement,
  ScrollAreaScrollbarImplProps
>(
  (props: ScopedProps<ScrollAreaScrollbarImplProps>, forwardedRef) => {
    const {
      __scopeScrollArea,
      sizes,
      hasThumb,
      onThumbChange,
      onThumbPointerUp,
      onThumbPointerDown,
      onThumbPositionChange,
      onDragScroll,
      onWheelScroll,
      onResize,
      ...scrollbarProps
    } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
    const [scrollbar, setScrollbar] = useState<ScrollAreaScrollbarElement | null>(null);
    const composeRefs = useComposedRefs(forwardedRef, node => setScrollbar(node));

    const rectRef = useRef<ClientRect | null>(null);
    const prevWebkitUserSelectRef = useRef<string>('');
    const viewport = context.viewport;
    const maxScrollPos = sizes.content - sizes.viewport;
    const handleWheelScroll = useCallbackRef(onWheelScroll);
    const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
    const handleResize = useDebounceCallback(onResize, 10);

    function handleDragScroll(event: React.PointerEvent<HTMLElement>) {
      if (rectRef.current) {
        const x = event.clientX - rectRef.current.left;
        const y = event.clientY - rectRef.current.top;
        onDragScroll({ x, y });
      }
    }

    useEffect(() => {
      const handleWheel = (event: WheelEvent) => {
        const element = event.target as HTMLElement;
        const isScrollbarWheel = scrollbar?.contains(element);
        if (isScrollbarWheel)
          handleWheelScroll(event, maxScrollPos);
      };
      document.addEventListener('wheel', handleWheel, { passive: false });
      return () => document.removeEventListener('wheel', handleWheel, { passive: false } as any);
    }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);

    useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);

    useResizeObserver(scrollbar, handleResize);
    useResizeObserver(context.content, handleResize);

    return (
      <ScrollbarProvider
        scope={__scopeScrollArea}
        scrollbar={scrollbar}
        hasThumb={hasThumb}
        onThumbChange={useCallbackRef(onThumbChange)}
        onThumbPointerUp={useCallbackRef(onThumbPointerUp)}
        onThumbPositionChange={handleThumbPositionChange}
        onThumbPointerDown={useCallbackRef(onThumbPointerDown)}
      >
        <Primitive.div
          {...scrollbarProps}
          ref={composeRefs}
          style={{ position: 'absolute', ...scrollbarProps.style }}
          onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target as HTMLElement;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar!.getBoundingClientRect();
              // pointer capture doesn't prevent text selection in Safari
              // so we remove text selection manually when scrolling
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = 'none';
              if (context.viewport)
                context.viewport.style.scrollBehavior = 'auto';
              handleDragScroll(event);
            }
          })}
          onPointerMove={composeEventHandlers(props.onPointerMove, handleDragScroll)}
          onPointerUp={composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target as HTMLElement;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport)
              context.viewport.style.scrollBehavior = '';
            rectRef.current = null;
          })}
        />
      </ScrollbarProvider>
    );
  },
);
