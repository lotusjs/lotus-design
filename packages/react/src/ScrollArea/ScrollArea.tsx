import React, { forwardRef } from 'react'
import classnames from '@pansy/classnames'
import { Root, Viewport, Corner } from '@lotus-design/react-primitives/scroll-area'
import { ScrollBar } from './ScrollBar'
import { useConfigContext } from '../Config'

export const ScrollArea = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, children, ...props }, ref) => {
  const { getPrefixCls } = useConfigContext('ScrollArea');

  const prefixCls = getPrefixCls!('scroll-area');

  return (
    <Root
      ref={ref}
      className={classnames(className, prefixCls)}
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
