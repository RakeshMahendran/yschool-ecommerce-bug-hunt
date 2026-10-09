import type { Order } from '../types';
import { STORAGE_KEYS, readJSON, writeJSON } from '../utils/storage';

const FIRST_ORDER_NUMBER = 1001;

export function loadOrders(): Order[] {
  const orders = readJSON<Order[]>(STORAGE_KEYS.orders, []);
  return Array.isArray(orders) ? orders : [];
}

export function nextOrderId(): string {
  return `YS-${FIRST_ORDER_NUMBER + loadOrders().length}`;
}

export function saveOrder(order: Order): void {
  writeJSON(STORAGE_KEYS.orders, [...loadOrders(), order]);
}

export function findOrder(id: string): Order | undefined {
  return loadOrders().find((order) => order.id === id);
}
