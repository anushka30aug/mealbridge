"use client";
import { AddressFormDialog } from "@/components/molecules";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddressChecker({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!address) {
      toast(
        "kindly provide your address so that we can find the nearest meal for you",
        {
          description: "Address is required to find meals near you.",
        }
      );
      setOpen(true);
    }
  }, [address]);
  return (
      <AddressFormDialog open={open} setOpen={setOpen} showContact={true} />
  );
}
