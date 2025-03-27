"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart,
  FileText
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Defining the type for menu items
type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

// Navigation items
const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: 'Documents',
    href: '/dashboard/documents',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={cn(
      "relative flex flex-col h-full bg-background border-r border-border",
      expanded ? "w-64" : "w-16",
      "transition-all duration-300 ease-in-out",
      className
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-border",
        expanded ? "justify-start" : "justify-center"
      )}>
        {expanded ? (
          <div className="font-bold text-lg">CompanyLogo</div>
        ) : (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
            <span className="font-bold">C</span>
          </div>
        )}
      </div>

      {/* Buton pentru expandare/colapsare */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-background shadow-sm z-10"
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Collapse menu" : "Expand menu"}
      >
        {expanded ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {/* Elemente navigare */}
      <nav className="flex-1 pt-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center p-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground",
              expanded ? "justify-start" : "justify-center"
            )}
          >
            <div className="flex items-center">
              {item.icon}
              {expanded && <span className="ml-3">{item.title}</span>}
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className={cn(
        "p-4 border-t border-border mt-auto",
        expanded ? "text-xs text-muted-foreground" : "hidden"
      )}>
        <p>© 2025 CompanyName</p>
      </div>
    </div>
  );
} 