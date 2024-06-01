import React, { forwardRef } from 'react'
import { useAvatarContext } from '../context'
import { FALLBACK_NAME } from '../constants'
import { Primitive } from '../../primitive'
import type { AvatarFallbackElement, AvatarFallbackProps, ScopedProps } from '../types'

const AvatarFallback = forwardRef<AvatarFallbackElement, AvatarFallbackProps>(
  (props: ScopedProps<AvatarFallbackProps>, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = React.useState(delayMs === undefined);

    React.useEffect(() => {
      if (delayMs !== undefined) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);

    return canRender && context.imageLoadingStatus !== 'loaded' ? (
      <Primitive.span {...fallbackProps} ref={forwardedRef} />
    ) : null;
  }
);

AvatarFallback.displayName = FALLBACK_NAME;

export { AvatarFallback, type AvatarFallbackProps }

