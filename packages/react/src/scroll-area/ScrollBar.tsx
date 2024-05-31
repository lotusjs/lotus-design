import React, { forwardRef } from 'react'
import { ScrollAreaScrollbar, ScrollAreaThumb } from '@lotus-design/react-primitives/es/scroll-area'
import { useConfigContext } from '../config'

export const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ className, ...props }, ref) => {
  const { getPrefixCls } = useConfigContext('ScrollArea');
  const prefixCls = getPrefixCls!('scroll-area');

  return (
    <ScrollAreaScrollbar
      ref={ref}
      className={`${prefixCls}-scrollbar`}
      {...props}
    >
      <ScrollAreaThumb className={`${prefixCls}-thumb`} />
    </ScrollAreaScrollbar>
  )
})

ScrollBar.displayName = ScrollAreaScrollbar.displayName
