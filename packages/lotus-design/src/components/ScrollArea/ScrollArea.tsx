import React, { forwardRef } from 'react'
import { Root, Viewport, Corner } from '@lotus-design/react-primitives/scroll-area'
import { ScrollBar } from './ScrollBar'

export const ScrollArea = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, children, ...props }, ref) => (
  <Root
    ref={ref}
    {...props}
  >
    <Viewport>
      {children}
    </Viewport>
    <ScrollBar />
    <Corner />
  </Root>
))

ScrollArea.displayName = Root.displayName
