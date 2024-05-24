import React, { forwardRef } from 'react'
import { ScrollAreaScrollbar, ScrollAreaThumb } from '@lotus-design/react-primitives'

export const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
  >
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaScrollbar.displayName
