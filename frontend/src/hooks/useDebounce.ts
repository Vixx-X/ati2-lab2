import useTimeout from "./useTimeout";
import { useEffect } from "react";

export default function useDebounce(
  callback: Function,
  delay: number,
  dependencies: any[]
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
}
