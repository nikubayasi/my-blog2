"use client";

import { UserProfile } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <UserProfile />
    </div>
  );
}
