"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }) {
  return (
    <ClerkProvider
      frontendApi="bold-mule-71.clerk.accounts.dev"
      proxyUrl="/clerk"
      appearance={{
        variables: {
          colorPrimary: "#2563eb", // 青系
          colorBackground: "#f3f4f6", // 背景をグレー
          colorText: "#1f2937", // 文字色をダークグレー
          colorDanger: "#ef4444", // エラーカラー
        },
        elements: {
          card: "shadow-xl border border-gray-300",
          submitButton: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
          formFieldLabel: "text-gray-700 font-medium",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
