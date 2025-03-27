"use client";

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar 
} from 'recharts';

// Date pentru grafice
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 5000 },
  { name: 'Mar', revenue: 8000 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 9000 },
  { name: 'Jun', revenue: 12000 },
];

const usageData = [
  { name: 'Storage', value: 65, fill: '#0088FE' },
  { name: 'CPU', value: 45, fill: '#00C49F' },
  { name: 'Memory', value: 80, fill: '#FFBB28' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome to the control panel"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-medium">Total Revenue</h3>
          </div>
          <div className="p-6 text-3xl font-bold">€12,345</div>
          <div className="text-xs text-muted-foreground">+12% compared to last month</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-medium">New Users</h3>
          </div>
          <div className="p-6 text-3xl font-bold">237</div>
          <div className="text-xs text-muted-foreground">+24% compared to last month</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-medium">Active Projects</h3>
          </div>
          <div className="p-6 text-3xl font-bold">12</div>
          <div className="text-xs text-muted-foreground">3 new this week</div>
        </div>
      </div>
      
      {/* Grafice */}
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Grafic Venituri Lunare */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Grafic Utilizare Sistem */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">System Usage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="20%" 
                outerRadius="80%" 
                barSize={20} 
                data={usageData}
              >
                <RadialBar 
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  dataKey="value" 
                />
                <Tooltip />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Tabel */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
        <div className="p-6">
          <h3 className="text-lg font-medium">Recent Activity</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-3 text-sm">{i + 1}</td>
                    <td className="px-4 py-3 text-sm">User {i + 1}</td>
                    <td className="px-4 py-3 text-sm">Updated profile</td>
                    <td className="px-4 py-3 text-sm">25 Mar 2025</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 