import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Test",
  description: "Next.js Interview Test Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
