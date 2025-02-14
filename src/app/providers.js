"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }) {
  return (
    <ClerkProvider
      frontendApi="bold-mule-71.clerk.accounts.dev"
      proxyUrl="/clerk"
    >
      {children}
    </ClerkProvider>
  );
}
