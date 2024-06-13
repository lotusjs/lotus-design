import type React from 'react';
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { composeRefs } from '../compose-refs';
import { mergeProps } from './utils';

interface SlotCloneProps {
  children: React.ReactNode;
}

export const SlotClone = forwardRef<any, SlotCloneProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (isValidElement(children)) {
      // eslint-disable-next-line react/no-clone-element
      return cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        // @ts-expect-error 暂时忽略
        ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
      });
    }

    // eslint-disable-next-line react/no-children-count, react/no-children-only
    return Children.count(children) > 1 ? Children.only(null) : null;
  },
);

SlotClone.displayName = 'SlotClone';
