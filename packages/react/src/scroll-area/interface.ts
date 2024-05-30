import React from 'react'
import { Root } from '@lotus-design/react-primitives/scroll-area'

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof Root> {
  size?: 'small' | 'default';
  theme?: 'dark' | 'light';
}