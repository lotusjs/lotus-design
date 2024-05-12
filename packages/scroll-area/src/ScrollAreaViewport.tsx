import React, { forwardRef, useRef } from 'react'
import { useScrollAreaContext } from './context'
import { Primitive } from './helpers/primitive'
import { useComposedRefs } from './helpers/composeRefs'
import type {
  PrimitiveDivProps,
  ScrollAreaViewportElement,
  ScopedProps,
} from './types'

const VIEWPORT_NAME = 'ScrollAreaViewport';

export interface ScrollAreaViewportProps extends PrimitiveDivProps {
  nonce?: string;
}

export const ScrollAreaViewport = forwardRef<ScrollAreaViewportElement, ScrollAreaViewportProps>(
  (props: ScopedProps<ScrollAreaViewportProps>, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = useRef<ScrollAreaViewportElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);

    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`,
          }}
          nonce={nonce}
        />

        <Primitive.div
          data-radix-scroll-area-viewport=""
          {...viewportProps}
          ref={composedRefs}
          style={{
            overflowX: context.scrollbarXEnabled ? 'scroll' : 'hidden',
            overflowY: context.scrollbarYEnabled ? 'scroll' : 'hidden',
            ...props.style,
          }}
        >
          <div ref={context.onContentChange} style={{ minWidth: '100%', display: 'table' }}>
            {children}
          </div>
        </Primitive.div>
      </>
    )
  }
)

ScrollAreaViewport.displayName = VIEWPORT_NAME;
