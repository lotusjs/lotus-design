import React, { forwardRef } from 'react'
import { Primitive } from '../../primitive'
import { NAME, DEFAULT_ORIENTATION } from '../constants'
import { isValidOrientation } from '../utils'
import type { SeparatorElement, DividerProps } from '../types'

export const Divider = forwardRef<SeparatorElement, DividerProps>(
  (props, forwardedRef) => {
    const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
    const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
    const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
    const semanticProps = decorative
      ? { role: 'none' }
      : { 'aria-orientation': ariaOrientation, role: 'separator' };

    return (
      <Primitive.div
        data-orientation={orientation}
        {...semanticProps}
        {...domProps}
        ref={forwardedRef}
      />
    );
  }
);

Divider.displayName = NAME;
