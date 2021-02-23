import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/skeletons/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/dashboard/shell';

import useSWR from 'swr';
import React from 'react';
import fetcher from '@/utils/fetcher';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

interface feedbackProps {}

const MyFeedback: React.FC<feedbackProps> = ({}) => {
   const { user } = useAuth();
   const { data } = useSWR(
      user ? ['/api/feedback', user.token] : null,
      fetcher
   );

   if (!data) {
      return (
         <DashboardShell>
            <FeedbackTableHeader />
            <SiteTableSkeleton />
         </DashboardShell>
      );
   }

   return (
      <DashboardShell>
         <FeedbackTableHeader />
         {data.feedback ? (
            <FeedbackTable allFeedback={data.feedback} />
         ) : (
            <EmptyState />
         )}
      </DashboardShell>
   );
};

export default MyFeedback;
