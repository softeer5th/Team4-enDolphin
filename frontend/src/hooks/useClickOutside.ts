import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  onClickOutside: (event: MouseEvent) => void,
) => {
  const notClickableRef: RefObject<T | null> = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isOutside =
        notClickableRef.current && !notClickableRef.current.contains(target);
      if (!isOutside) return;

      onClickOutside(e);
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [onClickOutside]);

  return notClickableRef;
};