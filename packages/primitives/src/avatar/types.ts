import type React from 'react';
import type { Primitive } from '../primitive';
import type { Scope } from '../context';

export type ScopedProps<P> = P & { __scopeAvatar?: Scope };
export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';
export interface AvatarContextValue {
  imageLoadingStatus: ImageLoadingStatus;
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => void;
}

type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
export type AvatarElement = React.ElementRef<typeof Primitive.span>;
export interface AvatarProps extends PrimitiveSpanProps {}

type PrimitiveImageProps = React.ComponentPropsWithoutRef<typeof Primitive.img>;
export type AvatarImageElement = React.ElementRef<typeof Primitive.img>;
export interface AvatarImageProps extends PrimitiveImageProps {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export type AvatarFallbackElement = React.ElementRef<typeof Primitive.span>;
export interface AvatarFallbackProps extends PrimitiveSpanProps {
  delayMs?: number;
}
