"use client";

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DocumentsPage() {
  // Mock document data - in a real app, this would come from an API
  const documents = [
    { id: '1', name: 'Company Policy.pdf', size: '2.4 MB', type: 'PDF', date: '05 Mar 2025' },
    { id: '2', name: 'Financial Report.xlsx', size: '1.8 MB', type: 'XLSX', date: '12 Mar 2025' },
    { id: '3', name: 'Project Roadmap.docx', size: '825 KB', type: 'DOCX', date: '18 Mar 2025' },
    { id: '4', name: 'Meeting Notes.txt', size: '34 KB', type: 'TXT', date: '22 Mar 2025' },
    { id: '5', name: 'Marketing Plan.pptx', size: '4.2 MB', type: 'PPTX', date: '27 Mar 2025' },
  ];

  // Date pentru graficul de distribuție a spațiului de stocare
  const storageData = [
    { name: 'PDF', size: 1200 },
    { name: 'DOCX', size: 800 },
    { name: 'XLSX', size: 1500 },
    { name: 'PPTX', size: 2100 },
    { name: 'Images', size: 3200 },
    { name: 'Videos', size: 5000 },
    { name: 'Others', size: 1100 },
  ];

  return (
    <DashboardLayout
      title="Documents"
      subtitle="Manage and view document files"
    >
      {/* Storage Summary */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium text-muted-foreground">Total Files</div>
          <div className="text-2xl font-bold mt-2">24</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium text-muted-foreground">Storage Used</div>
          <div className="text-2xl font-bold mt-2">28.5 GB</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium text-muted-foreground">Storage Remaining</div>
          <div className="text-2xl font-bold mt-2">71.5 GB</div>
        </div>
      </div>

      {/* Grafic distribuție spațiu stocare */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
        <div className="p-6">
          <h3 className="text-lg font-medium">Storage Usage by File Type (MB)</h3>
        </div>
        <div className="h-80 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={storageData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} MB`, 'Storage Size']} />
              <Legend />
              <Bar dataKey="size" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Documents List */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium">Recent Files</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{doc.id}</td>
                    <td className="px-4 py-3 text-sm">{doc.name}</td>
                    <td className="px-4 py-3 text-sm">{doc.size}</td>
                    <td className="px-4 py-3 text-sm">{doc.type}</td>
                    <td className="px-4 py-3 text-sm">{doc.date}</td>
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