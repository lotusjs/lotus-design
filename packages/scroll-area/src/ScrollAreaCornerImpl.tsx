import React, { forwardRef, useState } from 'react'
import { Primitive } from './helpers/primitive'
import { useScrollAreaContext } from './context'
import { CORNER_NAME } from './constants'
import { useResizeObserver } from './hooks/useResizeObserver'
import type {
  PrimitiveDivProps,
  ScopedProps,
  ScrollAreaCornerImplElement,
} from './types'

export interface ScrollAreaCornerImplProps extends PrimitiveDivProps {}

export const ScrollAreaCornerImpl = forwardRef<
  ScrollAreaCornerImplElement,
  ScrollAreaCornerImplProps
>(
  (props: ScopedProps<ScrollAreaCornerImplProps>, forwardedRef) => {
    const { __scopeScrollArea, ...cornerProps } = props;
    const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const hasSize = Boolean(width && height);

    useResizeObserver(context.scrollbarX, () => {
      const height = context.scrollbarX?.offsetHeight || 0;
      context.onCornerHeightChange(height);
      setHeight(height);
    });

    useResizeObserver(context.scrollbarY, () => {
      const width = context.scrollbarY?.offsetWidth || 0;
      context.onCornerWidthChange(width);
      setWidth(width);
    });

    return hasSize ? (
      <Primitive.div
        {...cornerProps}
        ref={forwardedRef}
        style={{
          width,
          height,
          position: 'absolute',
          right: context.dir === 'ltr' ? 0 : undefined,
          left: context.dir === 'rtl' ? 0 : undefined,
          bottom: 0,
          ...props.style,
        }}
      />
    ) : null;
  }
)
