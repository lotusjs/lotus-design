import React, { forwardRef } from 'react';
import { Primitive } from '../../primitive';
import { AVATAR_NAME } from '../constants';
import { AvatarProvider } from '../context';
import type { AvatarElement, AvatarProps, ImageLoadingStatus, ScopedProps } from '../types';

const Avatar = forwardRef<AvatarElement, AvatarProps>(
  (props: ScopedProps<AvatarProps>, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = React.useState<ImageLoadingStatus>('idle');
    return (
      <AvatarProvider
        scope={__scopeAvatar}
        imageLoadingStatus={imageLoadingStatus}
        onImageLoadingStatusChange={setImageLoadingStatus}
      >
        <Primitive.span {...avatarProps} ref={forwardedRef} />
      </AvatarProvider>
    );
  },
);

Avatar.displayName = AVATAR_NAME;

export { Avatar, type AvatarProps };
