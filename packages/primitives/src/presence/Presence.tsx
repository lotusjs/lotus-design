import type React from 'react';
import { Children, cloneElement } from 'react';
import { useComposedRefs } from '../compose-refs';
import { usePresence } from './usePresence';
import { getElementRef } from './utils';

export interface PresenceProps {
  children: React.ReactElement | ((props: { present: boolean }) => React.ReactElement);
  present: boolean;
}

export function Presence(props: PresenceProps) {
  const { present, children } = props;
  const presence = usePresence(present);

  const child = (
    typeof children === 'function'
      ? children({ present: presence.isPresent })
      // eslint-disable-next-line react/no-children-only
      : Children.only(children)
  ) as React.ReactElement;

  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === 'function';
  // eslint-disable-next-line react/no-clone-element
  return forceMount || presence.isPresent ? cloneElement(child, { ref }) : null;
}

Presence.displayName = 'Presence';
