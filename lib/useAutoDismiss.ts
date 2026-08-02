import { useEffect, useState } from "react";

/**
 * Shows content when `key` changes, then auto-hides after `delayMs`.
 */
export function useAutoDismiss(key: string, delayMs = 2000): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), delayMs);
    return () => window.clearTimeout(timer);
  }, [key, delayMs]);

  return visible;
}
