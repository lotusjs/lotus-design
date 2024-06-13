import React, { forwardRef, useEffect } from 'react';
import { useScrollAreaContext } from '../context';
import { SCROLLBAR_NAME } from '../constants';
import { Presence } from '../../presence';
import { composeEventHandlers } from '../../primitive';
import { useDebounceCallback } from '../../hooks/useDebounceCallback';
import { useStateMachine } from '../../hooks/useStateMachine';
import type {
  ScopedProps,
  ScrollAreaScrollbarScrollElement,
} from '../types';
import { ScrollAreaScrollbarVisible } from './ScrollAreaScrollbarVisible';
import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible';

interface ScrollAreaScrollbarScrollProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export const ScrollAreaScrollbarScroll = forwardRef<
  ScrollAreaScrollbarScrollElement,
  ScrollAreaScrollbarScrollProps
>(
  (props: ScopedProps<ScrollAreaScrollbarScrollProps>, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const isHorizontal = props.orientation === 'horizontal';
    const [state, send] = useStateMachine('hidden', {
      hidden: {
        SCROLL: 'scrolling',
      },
      scrolling: {
        SCROLL_END: 'idle',
        POINTER_ENTER: 'interacting',
      },
      interacting: {
        SCROLL: 'interacting',
        POINTER_LEAVE: 'idle',
      },
      idle: {
        HIDE: 'hidden',
        SCROLL: 'scrolling',
        POINTER_ENTER: 'interacting',
      },
    });
    const debounceScrollEnd = useDebounceCallback(() => send('SCROLL_END'), 100);

    useEffect(() => {
      if (state === 'idle') {
        const hideTimer = window.setTimeout(() => send('HIDE'), context.scrollHideDelay);
        return () => window.clearTimeout(hideTimer);
      }
    }, [state, context.scrollHideDelay, send]);

    useEffect(() => {
      const viewport = context.viewport;
      const scrollDirection = isHorizontal ? 'scrollLeft' : 'scrollTop';

      if (viewport) {
        let prevScrollPos = viewport[scrollDirection];
        const handleScroll = () => {
          const scrollPos = viewport[scrollDirection];
          const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
          if (hasScrollInDirectionChanged) {
            send('SCROLL');
            debounceScrollEnd();
          }
          prevScrollPos = scrollPos;
        };
        viewport.addEventListener('scroll', handleScroll);
        return () => viewport.removeEventListener('scroll', handleScroll);
      }
    }, [context.viewport, isHorizontal, send, debounceScrollEnd]);

    return (
      <Presence present={forceMount || state !== 'hidden'}>
        <ScrollAreaScrollbarVisible
          data-state={state === 'hidden' ? 'hidden' : 'visible'}
          {...scrollbarProps}
          ref={forwardedRef}
          onPointerEnter={composeEventHandlers(props.onPointerEnter, () => send('POINTER_ENTER'))}
          onPointerLeave={composeEventHandlers(props.onPointerLeave, () => send('POINTER_LEAVE'))}
        />
      </Presence>
    );
  },
);
