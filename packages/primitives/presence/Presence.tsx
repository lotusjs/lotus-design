import React, { Children, cloneElement } from 'react';
import { useComposedRefs } from '../compose-refs';
import { usePresence } from './usePresence'

export interface PresenceProps {
  children: React.ReactElement | ((props: { present: boolean }) => React.ReactElement);
  present: boolean;
}

export const Presence = (props: PresenceProps) => {
  const { present, children } = props;
  const presence = usePresence(present);

  const child = (
    typeof children === 'function'
      ? children({ present: presence.isPresent })
      : Children.only(children)
  ) as React.ReactElement;

  const ref = useComposedRefs(presence.ref, (child as any).ref);
  const forceMount = typeof children === 'function';
  return forceMount || presence.isPresent ? cloneElement(child, { ref }) : null;
};

Presence.displayName = 'Presence';
