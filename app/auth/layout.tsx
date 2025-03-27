"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth-store";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { clearAuthError } = useAuthStore();

  // Clear any auth errors when navigating between auth pages
  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Link 
            href="/" 
            className="mb-4 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors absolute top-6 left-6"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Homepage
          </Link>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">Sign in to your account or create a new one</p>
        </div>
        {children}
      </div>
    </div>
  );
} 