"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/auth-store";
import { loginSchema } from "@/lib/schemas";
import Cookies from "js-cookie";

type FormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, authError, isLoading, isAuthenticated } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  // Check cookie status for debugging
  useEffect(() => {
    const authCookie = Cookies.get('auth-token');
    console.log("Auth cookie on login page:", authCookie ? "Found" : "Not found");
    
    // Log authentication state
    console.log("Auth state on login page - isAuthenticated:", isAuthenticated);
    
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      console.log("Already authenticated, redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setFormError(null);
    setLoginStatus("Attempting login...");
    console.log("Login attempt with:", values.email);
    
    try {
      console.log("Calling login function");
      const success = await login(values.email, values.password);
      console.log("Login result:", success);
      
      if (success) {
        console.log("Login successful, redirecting to dashboard");
        setLoginStatus("Login successful! Redirecting...");
        
        // Short delay to show success message
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 500);
      } else {
        setLoginStatus("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormError("An unexpected error occurred. Please try again.");
      setLoginStatus("Error during login attempt.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold">Sign In</h2>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Error message from auth store */}
            {authError && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {authError}
              </div>
            )}
            
            {/* Form error */}
            {formError && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {formError}
              </div>
            )}
            
            {/* Login status */}
            {loginStatus && (
              <div className="rounded-md bg-primary/10 p-3 text-sm text-primary">
                {loginStatus}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-xs text-muted-foreground mb-2">
              For testing, use: john@example.com / password123
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/auth/register" className="underline underline-offset-4 hover:text-primary">
          Sign up
        </Link>
      </div>

      <div className="text-center text-sm mt-2">
        <Link href="/" className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <Home className="mr-1 h-4 w-4" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
} 