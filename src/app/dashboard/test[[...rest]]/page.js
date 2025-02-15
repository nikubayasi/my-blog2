"use client";

import { UserProfile } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <UserProfile
        appearance={{
          elements: {
            rootBox: "bg-white shadow-lg rounded-lg p-6",
            card: "border border-gray-300",
            headerTitle: "text-xl font-bold text-gray-800",
            headerSubtitle: "text-sm text-gray-600",
            profileSectionTitle: "text-lg font-semibold text-gray-700",
          },
        }}
      />
    </div>
  );
}
