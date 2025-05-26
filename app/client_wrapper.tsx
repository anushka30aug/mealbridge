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
      localStorage.setItem("userId", userId);
    }

    if (token) {
      localStorage.setItem("token", token);
    }
  }, [userId]);

  return <>{children}</>;
}
