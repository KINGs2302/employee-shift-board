'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ShiftForm from '@/components/ShiftForm';
import ShiftTable from '@/components/ShiftTable';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleShiftCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {user.role === 'admin' 
              ? 'Manage employee shifts and schedules' 
              : 'View your assigned shifts'}
          </p>
        </div>

        <div className="space-y-6">
          {user.role === 'admin' && (
            <ShiftForm onShiftCreated={handleShiftCreated} />
          )}
          
          <ShiftTable refreshTrigger={refreshKey} />
        </div>
      </div>
    </div>
  );
}