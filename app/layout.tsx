import { Toaster } from "@ui";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-left" richColors />
        {children}
      </body>
    </html>
  );
}
