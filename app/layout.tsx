import type { Metadata } from "next";
import "./globals.css";
import SocketProvider from "@/providers/socketProvider";

export const metadata: Metadata = {
  title: "MealBridge",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
