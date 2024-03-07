"use client"

import { useEffect, RefObject } from 'react';

export function useIntersectionObserver({ ref, cb }: { ref: RefObject<HTMLDivElement>, cb?: (intersecting: boolean) => void }) {
  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (cb) cb(entry.isIntersecting);
    });

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [cb, ref]);
};
