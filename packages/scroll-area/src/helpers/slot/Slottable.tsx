import React, { isValidElement } from 'react';

export const Slottable = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return isValidElement(child) && child.type === Slottable;
}
