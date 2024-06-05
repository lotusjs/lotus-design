import React, { forwardRef } from 'react';
import classNames from '@pansy/classnames'
import * as SeparatorPrimitive from '@lotus-design/react-primitives/es/divider'
import { useConfigContext } from '../config'

export const Divider = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>((
  { className, orientation = 'horizontal', decorative = true, ...props },
  ref
) => {
  const { getPrefixCls } = useConfigContext('Divider');
  const prefixCls = getPrefixCls!('divider');

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={classNames(
        prefixCls,
        className,
      )}
      {...props}
    />
  )
})
