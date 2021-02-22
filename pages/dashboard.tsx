import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/skeletons/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/dashboard/shell';

import useSWR from 'swr';
import React from 'react';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';

interface dashboardProps {}

const Dashboard: React.FC<dashboardProps> = ({}) => {
   const { user } = useAuth();
   const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

   if (!data) {
      return (
         <DashboardShell>
            <SiteTableSkeleton />
         </DashboardShell>
      );
   }

   return (
      <DashboardShell>
         {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </DashboardShell>
   );
};

export default Dashboard;
