// import { useCallback, useEffect, useRef } from "react";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const Debounce = <T extends (...args: any[]) => void>(
//   callback: T,
//   delay: number
// ): ((...args: Parameters<T>) => void) => {
//   const timeoutRef = useRef<number | undefined>();

//   const debouncedFunction = useCallback(
//     (...args: Parameters<T>) => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       timeoutRef.current = window.setTimeout(() => {
//         callback(...args);
//       }, delay);
//     },
//     [callback, delay] // Include dependencies to avoid recreating on every render
//   );

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [timeoutRef]); // Ensure cleanup on unmount

//   return debouncedFunction;
// };
// !
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
