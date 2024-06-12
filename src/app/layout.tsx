import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";



export const metadata: Metadata = {
  title: "MSU Marketplace",
  description:
    "Exclusive online marketplace platform for Montclair State Univerisity students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
