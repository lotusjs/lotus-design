import { Avatar, type AvatarProps } from './components/Avatar'
import { AvatarImage, type AvatarImageProps } from './components/AvatarImage'
import { AvatarFallback, type AvatarFallbackProps } from './components/AvatarFallback'
import { createAvatarScope } from './context'

const Root = Avatar;
const Image = AvatarImage;
const Fallback = AvatarFallback;

export {
  createAvatarScope,
  //
  Avatar,
  AvatarImage,
  AvatarFallback,
  //
  Root,
  Image,
  Fallback,
};
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps };
