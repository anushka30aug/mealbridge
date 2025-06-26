"use client";

import { useEffect } from "react";

export default function ClientWrapper({
  userId,
  token,
  children,
}: {
  userId: string | null;
  token: string | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (userId) {
      localStorage.setItem("collector_id", userId);
    }

    if (token) {
      localStorage.setItem("collector_token", token);
    }
  }, [userId]);

  return <>{children}</>;
}
