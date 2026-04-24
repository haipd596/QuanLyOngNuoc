import { useEffect, useRef } from 'react';

export const usePrevious = (value: any) => {
  const ref:any = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
