"use client";

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, TooltipProps } from 'recharts';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
      color: string;
    }
  }>;
}

// Componenta personalizată pentru tooltip
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card text-card-foreground border border-border shadow-md p-2 rounded">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value} reports`}</p>
      </div>
    );
  }
  return null;
};

// Componenta personalizată pentru labels
const CustomLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, name, percent, fill } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="currentColor"
      className="text-foreground text-xs"
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ReportsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock report data - in a real app, this would come from an API
  const reports = [
    { id: '1', name: 'Monthly Sales', status: 'Complete', date: '15 Mar 2025' },
    { id: '2', name: 'User Activity', status: 'Pending', date: '20 Mar 2025' },
    { id: '3', name: 'Performance Analysis', status: 'In Progress', date: '22 Mar 2025' },
    { id: '4', name: 'Quarterly Overview', status: 'Complete', date: '10 Mar 2025' },
    { id: '5', name: 'Annual Forecast', status: 'Draft', date: '01 Apr 2025' },
  ];

  // Date pentru graficul pieChart
  const statusData = [
    { name: 'Complete', value: 2, color: 'var(--color-green-500, #4ade80)' },  // Verde pentru Complete
    { name: 'In Progress', value: 1, color: 'var(--color-blue-500, #60a5fa)' }, // Albastru pentru In Progress
    { name: 'Pending', value: 1, color: 'var(--color-yellow-500, #facc15)' },   // Galben pentru Pending
    { name: 'Draft', value: 1, color: 'var(--color-gray-400, #94a3b8)' }      // Gri pentru Draft
  ];

  // Prevenirea efectului de hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <DashboardLayout
      title="Reports"
      subtitle="View and generate system reports"
    >
      {/* Reports Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium text-muted-foreground">Total Reports</div>
          <div className="text-2xl font-bold mt-2">15</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium text-muted-foreground">Completed</div>
          <div className="text-2xl font-bold mt-2">8</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium text-muted-foreground">In Progress</div>
          <div className="text-2xl font-bold mt-2">4</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium text-muted-foreground">Pending</div>
          <div className="text-2xl font-bold mt-2">3</div>
        </div>
      </div>

      {/* Grafic distribuție rapoarte */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
        <div className="p-6">
          <h3 className="text-lg font-medium">Report Status Distribution</h3>
        </div>
        <div className="h-96 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart 
              margin={{ top: 20, right: 60, bottom: 20, left: 60 }}
              width={500} 
              height={400}
            >
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                label={<CustomLabel />}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => <span className="text-foreground font-medium">{value}</span>}
                iconType="circle"
                className="text-foreground"
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reports List */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium">Recent Reports</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{report.id}</td>
                    <td className="px-4 py-3 text-sm">{report.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium 
                        ${report.status === 'Complete' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' : 
                          report.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' : 
                          report.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100' : 
                          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{report.date}</td>
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