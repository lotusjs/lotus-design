import React, { forwardRef } from 'react'
import { ScrollAreaScrollbar, ScrollAreaThumb } from '@lotus-design/react-primitives/scroll-area'
import { useConfigContext } from '../Config'

export const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  const { getPrefixCls } = useConfigContext('ScrollArea');
  const prefixCls = getPrefixCls!('scroll-area');

  return (
    <ScrollAreaScrollbar
      ref={ref}
      className={`${prefixCls}-scrollbar`}
      orientation={orientation}
    >
      <ScrollAreaThumb className={`${prefixCls}-thumb`} />
    </ScrollAreaScrollbar>
  )
})

ScrollBar.displayName = ScrollAreaScrollbar.displayName
