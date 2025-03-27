"use client";

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuthStore } from "@/lib/auth-store";
import { useEffect, useState } from "react";

// Define the user type to match what comes from auth store
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

export default function UsersPage() {
  const { registeredUsers } = useAuthStore();
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  
  // Ensure John Doe is always shown as admin in the UI
  useEffect(() => {
    // Make a local copy of users and ensure John Doe is admin
    const processedUsers = (registeredUsers || []).map(user => {
      if (user.email === "john@example.com") {
        return { ...user, role: "admin" };
      }
      return user;
    });
    
    setDisplayUsers(processedUsers);
    
    // Debug logging
    console.log("Original user data:", registeredUsers);
    console.log("Processed user data:", processedUsers);
    
    // One-time localStorage cleanup to force refresh on initial visit
    if (typeof window !== 'undefined' && sessionStorage.getItem('roleFixApplied') !== 'true') {
      console.log("Clearing localStorage to apply role fix");
      localStorage.removeItem("auth-storage");
      sessionStorage.setItem('roleFixApplied', 'true');
      // No reload here - we'll handle it with our local state instead
    }
  }, [registeredUsers]);

  return (
    <DashboardLayout
      title="Users"
      subtitle="Manage user accounts and permissions"
    >
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium">Registered Users</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.length > 0 ? (
                  displayUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3 text-sm">{user.id}</td>
                      <td className="px-4 py-3 text-sm">{user.name}</td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-sm text-muted-foreground">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 