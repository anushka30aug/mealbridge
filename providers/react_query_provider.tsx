"use client";
import { getQueryClient } from "@/constants/react_query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo } from "react";

interface props {
  children: React.ReactNode;
}
export default function ReactQueryProvider({ children }: props) {
  const queryclient = useMemo(getQueryClient, []);
  return (
    <QueryClientProvider client={queryclient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
