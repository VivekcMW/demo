import { useOrderStore, type NewOrderPayload } from "@/store/useOrderStore";
import { useOrderSetStore } from "@/store/useOrderSetStore";
import type { OrderSetItem } from "@/store/useOrderSetStore";

export interface OrderSetSubmissionResult {
  created: number;
  failed: number;
  orderIds: string[];
}

export function submitOrderSetItems(
  selectedItemIds: string[],
  patientId: string,
  patientName: string,
  orderedBy: string
): OrderSetSubmissionResult {
  const orderStore = useOrderStore.getState();
  const orderSetStore = useOrderSetStore.getState();

  const orderIds: string[] = [];
  let created = 0;
  let failed = 0;

  for (const itemId of selectedItemIds) {
    let foundItem: OrderSetItem | undefined;
    for (const os of orderSetStore.orderSets) {
      foundItem = os.items.find((i) => i.id === itemId);
      if (foundItem) break;
    }

    if (!foundItem) {
      failed++;
      continue;
    }

    const payload: NewOrderPayload = {
      patientId,
      patientName,
      orderedBy,
      type: foundItem.type,
      title: foundItem.title,
      details: foundItem.details || "",
      priority: foundItem.priority,
    };

    const newOrder = orderStore.addOrder(payload);
    orderIds.push(newOrder.id);
    created++;
  }

  return { created, failed, orderIds };
}
