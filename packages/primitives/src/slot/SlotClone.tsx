import React, { forwardRef, isValidElement, cloneElement, Children } from 'react';
import { composeRefs } from '../compose-refs'
import { mergeProps } from './utils'

interface SlotCloneProps {
  children: React.ReactNode;
}

export const SlotClone = forwardRef<any, SlotCloneProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (isValidElement(children)) {
      return cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        // @ts-expect-error
        ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
      })
    }

    return Children.count(children) > 1 ? Children.only(null) : null;
  }
)

SlotClone.displayName = 'SlotClone';
