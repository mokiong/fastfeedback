import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/skeletons/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';

import useSWR from 'swr';
import React from 'react';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import Page from '@/components/Page';
import MyDashboardHeader from '@/components/MyDashboardHeader';
import DashboardShell from '@/components/dashboard/shell';

interface dashboardProps {}

const MySites: React.FC<dashboardProps> = ({}) => {
   const { user } = useAuth();
   const { data } = useSWR(user ? [`/api/sites`, user.token] : null, fetcher);

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
         <MyDashboardHeader />
         {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </DashboardShell>
   );
};

const MySitePage = () => (
   <Page name="My Sites" path="/my-sites">
      <MySites />
   </Page>
);

export default MySitePage;
