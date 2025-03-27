"use client";

import { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuthStore } from "@/lib/auth-store";
import { useTheme } from "next-themes";
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Bell, BellOff } from "lucide-react";

export default function SettingsPage() {
  const { user, logout, updateUserProfile } = useAuthStore();
  const { theme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);

  const handleSaveSettings = () => {
    // Clear previous messages
    setSaveMessage(null);
    setSaveError(null);

    try {
      // Get the updated display name
      const newDisplayName = displayNameRef.current?.value || '';
      
      if (newDisplayName === '') {
        setSaveError("Display name cannot be empty");
        return;
      }
      
      // Update the user profile
      const success = updateUserProfile({ name: newDisplayName });
      
      if (success) {
        setSaveMessage("Settings saved successfully!");
        console.log("Updated user profile with new name:", newDisplayName);
      } else {
        setSaveError("Failed to update settings");
      }
      
      // Clear message after a delay
      setTimeout(() => {
        setSaveMessage(null);
        setSaveError(null);
      }, 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveError("An unexpected error occurred");
      setTimeout(() => setSaveError(null), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const isDarkMode = theme === "dark";

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your account and application preferences"
    >
      {/* Settings Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Settings */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Account Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="displayName" className="text-sm font-medium">Display Name</label>
              <input 
                id="displayName"
                ref={displayNameRef}
                type="text" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" 
                defaultValue={user?.name}
                aria-label="Display Name"
              />
            </div>
            
            <div>
              <label htmlFor="emailAddress" className="text-sm font-medium">Email Address</label>
              <input 
                id="emailAddress"
                type="email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                defaultValue={user?.email} 
                disabled
                aria-label="Email Address"
              />
              <p className="text-xs text-muted-foreground mt-1">Email address can't be changed</p>
            </div>
            
            <div>
              <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
              <input 
                id="currentPassword"
                type="password" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                placeholder="Enter current password" 
                aria-label="Current Password"
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
              <input 
                id="newPassword"
                type="password" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                placeholder="Enter new password" 
                aria-label="New Password"
              />
            </div>
          </div>
        </div>
        
        {/* Application Settings */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Application Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Enable dark theme for the interface</p>
              </div>
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={toggleEmailNotifications}
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border-0 bg-transparent p-0 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  aria-label={emailNotifications ? "Disable Email Notifications" : "Enable Email Notifications"}
                  title={emailNotifications ? "Disable Email Notifications" : "Enable Email Notifications"}
                >
                  <Bell className={`h-5 w-5 rotate-0 scale-100 transition-all ${emailNotifications ? "text-primary" : "-rotate-90 scale-0 text-muted-foreground"}`} />
                  <BellOff className={`absolute h-5 w-5 left-2 top-2 rotate-90 scale-0 transition-all ${!emailNotifications ? "rotate-0 scale-100 text-muted-foreground" : ""}`} />
                  <span className="sr-only">Toggle email notifications</span>
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="language" className="text-sm font-medium">Language</label>
              <select 
                id="language"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timezone" className="text-sm font-medium">Time Zone</label>
              <select 
                id="timezone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                aria-label="Select Time Zone"
              >
                <option value="utc">UTC (Coordinated Universal Time)</option>
                <option value="est">EST (Eastern Standard Time)</option>
                <option value="cst">CST (Central Standard Time)</option>
                <option value="pst">PST (Pacific Standard Time)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6">
        <div>
          {saveMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
              {saveMessage}
            </div>
          )}
          {saveError && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm">
              {saveError}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleLogout} 
            className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm font-medium"
            aria-label="Logout"
          >
            Logout
          </button>
          <button 
            onClick={handleSaveSettings} 
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
            aria-label="Save Changes"
          >
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
} 