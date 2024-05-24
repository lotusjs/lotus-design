import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { isSlottable } from './Slottable'
import { SlotClone } from './SlotClone'

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = forwardRef<HTMLElement, SlotProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      const newElement = slottable.props.children as React.ReactNode;

      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (Children.count(newElement) > 1) return Children.only(null);

          return isValidElement(newElement)
            ? (newElement.props.children as React.ReactNode)
            : null;
        } else {
          return child;
        }
      })

      return (
        <SlotClone {...slotProps} ref={forwardedRef}>
          {isValidElement(newElement)
            ? cloneElement(newElement, undefined, newChildren)
            : null}
        </SlotClone>
      )
    }

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {children}
      </SlotClone>
    );
  }
)

Slot.displayName = 'Slot';
