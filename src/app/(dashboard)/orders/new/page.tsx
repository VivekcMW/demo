"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NewOrderDrawer } from "@/components/orders/NewOrderDrawer";

export default function NewOrderPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    router.push("/orders");
  }

  return (
    <NewOrderDrawer
      open={open}
      onClose={handleClose}
    />
  );
}
