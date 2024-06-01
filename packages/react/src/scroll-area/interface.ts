import { Root } from '@lotus-design/react-primitives/es/scroll-area'
import type { ComponentPropsWithoutRef } from '@lotus-design/react-primitives/es/primitive'

export interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof Root> {
  size?: 'small' | 'default';
  theme?: 'dark' | 'light';
}
