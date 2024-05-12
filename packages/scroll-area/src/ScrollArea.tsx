import React, { forwardRef, useState } from 'react'
import { Primitive } from './helpers/primitive';
import { useComposedRefs } from './helpers/composeRefs'
import { ScrollAreaProvider } from './context'
import { SCROLL_AREA_NAME } from './constants'
import { useDirection } from './Direction'
import type {
  PrimitiveDivProps,
  ScrollAreaScrollbarElement,
  ScrollAreaElement,
  ScrollAreaViewportElement,
  ScopedProps,
  ScrollAreaContextValue,
} from './types'

export interface ScrollAreaProps extends PrimitiveDivProps {
  type?: ScrollAreaContextValue['type'];
  dir?: ScrollAreaContextValue['dir'];
  scrollHideDelay?: number;
}

export const ScrollArea = forwardRef<ScrollAreaElement, ScrollAreaProps>(
  (props: ScopedProps<ScrollAreaProps>, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = 'hover',
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = useState<ScrollAreaElement | null>(null);
    const [viewport, setViewport] = useState<ScrollAreaViewportElement | null>(null);
    const [content, setContent] = useState<HTMLDivElement | null>(null);
    const [scrollbarX, setScrollbarX] = useState<ScrollAreaScrollbarElement | null>(null);
    const [scrollbarY, setScrollbarY] = useState<ScrollAreaScrollbarElement | null>(null);
    const [cornerWidth, setCornerWidth] = useState(0);
    const [cornerHeight, setCornerHeight] = useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);

    return (
      <ScrollAreaProvider
        scope={__scopeScrollArea}
        type={type}
        dir={direction}
        scrollHideDelay={scrollHideDelay}
        scrollArea={scrollArea}
        viewport={viewport}
        onViewportChange={setViewport}
        content={content}
        onContentChange={setContent}
        scrollbarX={scrollbarX}
        onScrollbarXChange={setScrollbarX}
        scrollbarXEnabled={scrollbarXEnabled}
        onScrollbarXEnabledChange={setScrollbarXEnabled}
        scrollbarY={scrollbarY}
        onScrollbarYChange={setScrollbarY}
        scrollbarYEnabled={scrollbarYEnabled}
        onScrollbarYEnabledChange={setScrollbarYEnabled}
        onCornerWidthChange={setCornerWidth}
        onCornerHeightChange={setCornerHeight}
      >
        <Primitive.div
          dir={direction}
          {...scrollAreaProps}
          ref={composedRefs}
          style={{
            position: 'relative',
            // Pass corner sizes as CSS vars to reduce re-renders of context consumers
            ['--radix-scroll-area-corner-width' as any]: cornerWidth + 'px',
            ['--radix-scroll-area-corner-height' as any]: cornerHeight + 'px',
            ...props.style,
          }}
        />
      </ScrollAreaProvider>
    )
  }
)

ScrollArea.displayName = SCROLL_AREA_NAME;
