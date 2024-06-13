import React, { forwardRef } from 'react';
import { useLayoutEffect } from '../../hooks/useLayoutEffect';
import { useCallbackRef } from '../../hooks/useCallbackRef';
import { useAvatarContext } from '../context';
import { Primitive } from '../../primitive';
import { IMAGE_NAME } from '../constants';
import { useImageLoadingStatus } from '../hooks/useImageLoadingStatus';
import type { AvatarImageElement, AvatarImageProps, ImageLoadingStatus, ScopedProps } from '../types';

const AvatarImage = forwardRef<AvatarImageElement, AvatarImageProps>(
  (props: ScopedProps<AvatarImageProps>, forwardedRef) => {
    // eslint-disable-next-line react/no-unstable-default-props
    const { __scopeAvatar, src, onLoadingStatusChange = () => {}, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src);
    const handleLoadingStatusChange = useCallbackRef((status: ImageLoadingStatus) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });

    useLayoutEffect(() => {
      if (imageLoadingStatus !== 'idle') {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);

    return imageLoadingStatus === 'loaded'
      ? (
        <Primitive.img {...imageProps} ref={forwardedRef} src={src} />
        )
      : null;
  },
);

AvatarImage.displayName = IMAGE_NAME;

export { AvatarImage, type AvatarImageProps };
