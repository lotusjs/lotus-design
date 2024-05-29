import React, { forwardRef } from 'react'
import classnames from '@pansy/classnames'
import { Root, Viewport, Corner } from '@lotus-design/react-primitives/scroll-area'
import { ScrollBar } from './ScrollBar'
import { useConfigContext } from '../config'

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof Root> {
  size?: 'small' | 'default';
  theme?: 'dark' | 'light';
}

export const ScrollArea = forwardRef<
  React.ElementRef<typeof Root>,
  ScrollAreaProps
>((
  {
    className,
    children,
    size = 'default',
    theme = 'light',
    ...props
  },
  ref
) => {
  const { getPrefixCls } = useConfigContext('ScrollArea');

  const prefixCls = getPrefixCls!('scroll-area');

  return (
    <Root
      ref={ref}
      className={classnames(
        prefixCls,
        {
          [`${prefixCls}-small`]: size === 'small',
          [`${prefixCls}-dark`]: theme === 'dark',
        },
        className,
      )}
      {...props}
    >
      <Viewport className={`${prefixCls}-viewport`}>
        {children}
      </Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  )
})

ScrollArea.displayName = Root.displayName
