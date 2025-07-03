"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RouterInstance = ReturnType<typeof useRouter>;
export async function logout(router: RouterInstance) {
  toast.loading("Logging out...");
  await fetch("/api/logout");
  localStorage.removeItem("collector_id");
  localStorage.removeItem("collector_token");
  router.push("/signin");
  toast.dismiss();
}
