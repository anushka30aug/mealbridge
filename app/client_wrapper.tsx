"use client";

import { useEffect } from "react";

export default function ClientWrapper({
  userId,
  children,
}: {
  userId: string | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (userId) {
      
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  return <>{children}</>;
}
