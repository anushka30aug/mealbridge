"use client";

import { useEffect } from "react";

export default function ClientWrapper({
  collectorId,
  token,
  children,
}: {
  collectorId: string | null;
  token: string | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (collectorId) {
      localStorage.setItem("collector_id", collectorId);
    }

    if (token) {
      localStorage.setItem("collector_token", token);
    }
  }, [collectorId]);

  return <>{children}</>;
}
