import React, { forwardRef, useEffect } from 'react';
import { SCROLLBAR_NAME } from '../constants';
import { useScrollAreaContext } from '../context';
import type { ScopedProps, ScrollAreaScrollbarElement } from '../types';
import { ScrollAreaScrollbarHover } from './ScrollAreaScrollbarHover';
import { ScrollAreaScrollbarScroll } from './ScrollAreaScrollbarScroll';
import { ScrollAreaScrollbarAuto } from './ScrollAreaScrollbarAuto';
import { ScrollAreaScrollbarVisible } from './ScrollAreaScrollbarVisible';
import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible';

export interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export const ScrollAreaScrollbar = forwardRef<ScrollAreaScrollbarElement, ScrollAreaScrollbarProps>(
  (props: ScopedProps<ScrollAreaScrollbarProps>, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === 'horizontal';

    useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);

    return context.type === 'hover'
      ? (
        <ScrollAreaScrollbarHover {...scrollbarProps} ref={forwardedRef} forceMount={forceMount} />
        )
      : context.type === 'scroll'
        ? (
          <ScrollAreaScrollbarScroll {...scrollbarProps} ref={forwardedRef} forceMount={forceMount} />
          )
        : context.type === 'auto'
          ? (
            <ScrollAreaScrollbarAuto {...scrollbarProps} ref={forwardedRef} forceMount={forceMount} />
            )
          : context.type === 'always'
            ? (
              <ScrollAreaScrollbarVisible {...scrollbarProps} ref={forwardedRef} />
              )
            : null;
  },
);
