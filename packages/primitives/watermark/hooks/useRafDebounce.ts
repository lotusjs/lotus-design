import { useRef } from 'react'
import { raf, useMemoizedFn } from '@rcuse/core'

export function useRafDebounce(callback: VoidFunction) {
  const executeRef = useRef(false);
  const rafRef = useRef<number>();

  const wrapperCallback = useMemoizedFn(callback);

  return () => {
    if (executeRef.current) {
      return;
    }

    executeRef.current = true;
    wrapperCallback();

    rafRef.current = raf(() => {
      executeRef.current = false;
    });
  };
}
