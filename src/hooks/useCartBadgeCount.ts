import { useEffect, useState } from 'react';
import { useLocation } from '../context/RouterContext';
import type { CartLine } from '../types';
import { STORAGE_KEYS, readJSON } from '../utils/storage';

function readStoredCount(): number {
  const stored = readJSON<{ items?: CartLine[] }>(STORAGE_KEYS.cart, {});
  return (stored.items ?? []).reduce((count, item) => count + item.quantity, 0);
}

export function useCartBadgeCount(): number {
  const location = useLocation();
  const [count, setCount] = useState(readStoredCount);

  useEffect(() => {
    setCount(readStoredCount());
  }, [location.key]);

  return count;
}
