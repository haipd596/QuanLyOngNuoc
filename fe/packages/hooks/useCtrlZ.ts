import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectActiveSchema, setActiveFieldKey, setSchema } from '~/redux/slices';

export const useCtrlZ = () => {
  const isFirstRender = useRef(true);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const snapshotRef = useRef<any>([]);
  const pointerRef = useRef(0);
  const activeSchema = useAppSelector(selectActiveSchema);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handlers = (e: any) => {
      if (e.ctrlKey || e.metaKey) {
        let isTrigger = false;

        if (e.keyCode === 90) {
          if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
          }

          if (pointerRef.current >= 1) {
            pointerRef.current -= 1;
            dispatch(setSchema(snapshotRef.current[pointerRef.current]));
            dispatch(setActiveFieldKey(null));
            isTrigger = true;
          }
        }

        // if (e.keyCode === 66) {
        //   if (timeOutRef.current) {
        //     clearTimeout(timeOutRef.current);
        //   }

        //   if (pointerRef.current < snapshotRef.current.length) {
        //     pointerRef.current += 1;
        //     dispatch(setSchema(snapshotRef.current[pointerRef.current]));
        //     isTrigger = true;
        //   }
        // }

        if (isTrigger) {
          isFirstRender.current = false;
          timeOutRef.current = setTimeout(() => {
            isFirstRender.current = true;
            if (pointerRef.current >= 0) {
              snapshotRef.current = snapshotRef.current.slice(0, pointerRef.current + 1);
              pointerRef.current = snapshotRef.current.length - 1;
            }
          }, 300);
        }
      }
    };

    document?.addEventListener('keydown', handlers);

    return () => {
      document.removeEventListener('keydown', handlers);
      isFirstRender.current = true;
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      snapshotRef.current.push(activeSchema);
      pointerRef.current = snapshotRef.current.length - 1;
    }
  }, [activeSchema]);
};
