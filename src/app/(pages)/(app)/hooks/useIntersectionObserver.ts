"use client"

import { useEffect, RefObject, useRef } from 'react';

export function useIntersectionObserver({ ref, cb }: { ref: RefObject<HTMLDivElement>, cb?: (intersecting: boolean) => void }) {
  const observer = useRef<IntersectionObserver>();

  const unobserve = () => {
    if (ref.current && observer.current) {
      observer.current.unobserve(ref.current)
      observer.current.disconnect()
    }
  }

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    observer.current = new IntersectionObserver(([entry]) => {
      if (cb) cb(entry.isIntersecting);
    });

    if (current) observer.current.observe(current);

    return () => {
      unobserve();
    };
  }, [cb, ref]);

  return { unobserve };
};
