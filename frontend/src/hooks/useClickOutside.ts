import useEventListener from './useEventListener';

export default function useClickOutside(ref: any, cb: Function) {
  useEventListener(
    'click',
    (e: Event) => {
      if (ref.current == null || ref.current.contains(e.target)) return;
      cb(e);
    },
    typeof window !== 'undefined' ? window.document : null
  );
}
