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
import { registerSchema } from "@/lib/schemas";
import Cookies from "js-cookie";

type FormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, authError, isLoading, isAuthenticated } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);
  const [registerStatus, setRegisterStatus] = useState<string | null>(null);

  // Check cookie status for debugging
  useEffect(() => {
    const authCookie = Cookies.get('auth-token');
    console.log("Auth cookie on register page:", authCookie ? "Found" : "Not found");
    
    // Log authentication state
    console.log("Auth state on register page - isAuthenticated:", isAuthenticated);
    
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      console.log("Already authenticated, redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setFormError(null);
    setRegisterStatus("Creating your account...");
    console.log("Registration attempt with:", values.email);
    
    try {
      console.log("Calling register function");
      const success = await register(values.name, values.email, values.password);
      console.log("Registration result:", success);
      
      if (success) {
        console.log("Registration successful, redirecting to dashboard");
        setRegisterStatus("Account created successfully! Redirecting...");
        
        // Short delay to show success message
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 500);
      } else {
        setRegisterStatus("Registration failed. Please try a different email.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setFormError("An unexpected error occurred. Please try again.");
      setRegisterStatus("Error during registration attempt.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold">Create Account</h2>
          <p className="text-sm text-muted-foreground">Register to access the dashboard</p>
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
            
            {/* Registration status */}
            {registerStatus && (
              <div className="rounded-md bg-primary/10 p-3 text-sm text-primary">
                {registerStatus}
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
          Sign in
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