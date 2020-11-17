import { useEffect } from "react";

export function useInterval(callback: any, delay: number) {
  useEffect(() => {
    if (delay > 0) {
      const id = setInterval(callback, delay)
      return () => clearInterval(id)
    }
    return () => {}
  }, [callback, delay])
}
