"use client";

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuthStore } from "@/lib/auth-store";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout
      title="Profile"
      subtitle="Manage your account settings and profile information"
    >
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-lg font-medium">User Profile</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <p className="font-medium">Name:</p>
              <p>{user?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <p className="font-medium">Email:</p>
              <p>{user?.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p className="font-medium">User ID:</p>
              <p>{user?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 