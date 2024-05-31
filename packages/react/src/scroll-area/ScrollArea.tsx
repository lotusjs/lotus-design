import React, { forwardRef } from 'react'
import classnames from '@pansy/classnames'
import { Root, Viewport, Corner, useScrollAreaContext, AutoHeight } from '@lotus-design/react-primitives/scroll-area'
import { ScrollBar } from './ScrollBar'
import { useConfigContext } from '../config'
import type { ScrollAreaProps } from './interface'

const InternalCompoundedScrollArea = forwardRef<
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
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <Corner />
    </Root>
  )
})

type CompoundedComponent = typeof InternalCompoundedScrollArea & {
  AutoHeight: typeof AutoHeight
  useScrollAreaContext: typeof useScrollAreaContext
};

const ScrollArea = InternalCompoundedScrollArea as CompoundedComponent;

ScrollArea.AutoHeight = AutoHeight
ScrollArea.useScrollAreaContext = useScrollAreaContext
ScrollArea.displayName = Root.displayName

export default ScrollArea;
