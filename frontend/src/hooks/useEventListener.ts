import { useEffect, useRef } from 'react';

export default function useEventListener(
  eventType: string,
  callback: Function,
  element: any = typeof window !== 'undefined' ? window.document : null
) {
  const callbackRef = useRef(callback);

  // take care of additional rerenders
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!element) return;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);
    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
