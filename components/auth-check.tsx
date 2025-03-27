"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import Cookies from "js-cookie";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    // Check for authentication
    const checkAuth = () => {
      const authCookie = Cookies.get('auth-token');
      const cookieAuth = authCookie ? JSON.parse(authCookie).isAuthenticated : false;
      const storeAuth = isAuthenticated;
      
      console.log("Auth check - cookie auth:", cookieAuth);
      console.log("Auth check - store auth:", storeAuth);
      
      // Consider authorized if either cookie or store indicates authentication
      const authorized = cookieAuth || storeAuth;
      
      if (!authorized) {
        console.log("Not authenticated, redirecting to login");
        router.push("/auth/login");
      } else {
        console.log("Authenticated, allowing access to protected content");
        setIsAuthorized(true);
      }
      
      setIsChecking(false);
    };
    
    // Small delay to ensure store is hydrated
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  // Show loading state during check
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Only render children if authorized
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
} 