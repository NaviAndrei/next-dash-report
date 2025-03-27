"use client";

import { useRef, useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";

export function StoreHydration() {
  const initialized = useRef(false);

  useEffect(() => {
    // Initialize store on client
    if (!initialized.current) {
      console.log("Hydrating auth store...");
      // This triggers zustand's persist loading from localStorage
      useAuthStore.persist.rehydrate();
      initialized.current = true;
      
      // Log store state after rehydration
      setTimeout(() => {
        const state = useAuthStore.getState();
        console.log("Auth store hydrated, authenticated:", state.isAuthenticated);
        console.log("Registered users:", state.registeredUsers?.length || 0);
      }, 100);
    }
  }, []);

  return null;
} 