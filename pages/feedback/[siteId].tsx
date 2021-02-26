import SiteTableSkeleton from '@/components/skeletons/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/dashboard/shell';

import useSWR from 'swr';
import React from 'react';
import fetcher from '@/utils/fetcher';
import FeedbackTable from '@/components/FeedbackTable';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';
import Page from '@/components/Page';
import { useRouter } from 'next/router';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';

interface feedbackProps {}

const SiteFeedback: React.FC<feedbackProps> = ({}) => {
   const { user } = useAuth();
   const { query } = useRouter();
   const { data } = useSWR(
      user ? [`/api/feedback/${query.siteId}`, user.token] : null,
      fetcher
   );

   if (!data) {
      return (
         <DashboardShell>
            <SiteFeedbackTableHeader siteName={false} />
            <SiteTableSkeleton />
         </DashboardShell>
      );
   }

   return (
      <DashboardShell>
         <SiteFeedbackTableHeader siteName={data.site.name} />
         {data.feedback ? (
            <FeedbackTable allFeedback={data.feedback} />
         ) : (
            <FeedbackEmptyState />
         )}
      </DashboardShell>
   );
};

const SiteFeedbackPage = () => (
   <Page name="My Feedback" path="/feedback/">
      <SiteFeedback />
   </Page>
);

export default SiteFeedbackPage;
