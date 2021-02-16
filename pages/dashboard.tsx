import EmptyState from '@/components/dashboard/EmptyState';
import { useAuth } from '@/lib/auth';
import React from 'react';

interface dashboardProps {}

const Dashboard: React.FC<dashboardProps> = ({}) => {
   const auth = useAuth();

   if (!auth?.user) {
      return <div>'Loading...'</div>;
   }

   return <EmptyState />;
};

export default Dashboard;
