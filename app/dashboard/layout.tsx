"use client";

import React from 'react';
import { AuthCheck } from '@/components/auth-check';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthCheck>{children}</AuthCheck>;
} 