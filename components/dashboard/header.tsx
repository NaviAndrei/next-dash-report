"use client";

import React from 'react';
import { UserNav } from './user-nav';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Header({ title, subtitle, className }: HeaderProps) {
  return (
    <header className={cn(
      "px-6 py-4 border-b border-border flex items-center justify-between bg-background",
      className
    )}>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
} 