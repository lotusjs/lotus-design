import React, { forwardRef } from 'react';
import { CORNER_NAME } from '../constants';
import { useScrollAreaContext } from '../context';
import type {
  ScopedProps,
  ScrollAreaCornerElement,
} from '../types';
import { ScrollAreaCornerImpl, type ScrollAreaCornerImplProps } from './ScrollAreaCornerImpl';

export interface ScrollAreaCornerProps extends ScrollAreaCornerImplProps {}

export const ScrollAreaCorner = forwardRef<ScrollAreaCornerElement, ScrollAreaCornerProps>(
  (props: ScopedProps<ScrollAreaCornerProps>, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== 'scroll' && hasBothScrollbarsVisible;
    return hasCorner ? <ScrollAreaCornerImpl {...props} ref={forwardedRef} /> : null;
  },
);
