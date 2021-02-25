import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/skeletons/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/dashboard/shell';

import useSWR from 'swr';
import React from 'react';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import Page from '@/components/Page';

interface dashboardProps {}

const Dashboard: React.FC<dashboardProps> = ({}) => {
   const { user } = useAuth();
   const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

   if (!data) {
      return (
         <DashboardShell>
            <SiteTableHeader />
            <SiteTableSkeleton />
         </DashboardShell>
      );
   }

   return (
      <DashboardShell>
         <SiteTableHeader />
         {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </DashboardShell>
   );
};

const DashboardPage = () => (
   <Page name="Dashboard" path="/dashboard">
      <Dashboard />
   </Page>
);

export default DashboardPage;
