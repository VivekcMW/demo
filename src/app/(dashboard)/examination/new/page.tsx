"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NewExaminationDrawer } from "@/components/examination/NewExaminationDrawer";

export default function NewExaminationPage() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  function handleClose() {
    setOpen(false);
    router.push("/examination");
  }

  return (
    <div className="pb-8">
      <NewExaminationDrawer open={open} onClose={handleClose} />
    </div>
  );
}
