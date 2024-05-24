import React, { forwardRef } from 'react'
import { useScrollbarContext } from '../context'
import { THUMB_NAME } from '../constants'
import { Presence } from '../../presence'
import { ScrollAreaThumbImpl } from './ScrollAreaThumbImpl'
import type { ScrollAreaThumbImplProps } from './ScrollAreaThumbImpl'
import type { ScopedProps, ScrollAreaThumbElement } from '../types'

export interface ScrollAreaThumbProps extends ScrollAreaThumbImplProps {
  forceMount?: true;
}

export const ScrollAreaThumb = forwardRef<ScrollAreaThumbElement, ScrollAreaThumbProps>(
  (props: ScopedProps<ScrollAreaThumbProps>, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return (
      <Presence present={forceMount || scrollbarContext.hasThumb}>
        <ScrollAreaThumbImpl ref={forwardedRef} {...thumbProps} />
      </Presence>
    );
  }
);
