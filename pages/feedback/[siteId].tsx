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

const SiteFeedback = ({}) => {
   const { user } = useAuth();
   const { query } = useRouter();
   const { siteId } = query;

   const { data } = useSWR(
      user ? [`/api/feedback/${siteId}`, user.token] : null,
      fetcher
   );

   if (!data) {
      return (
         <DashboardShell>
            <SiteFeedbackTableHeader
               isSiteOwner={data?.site?.authorId === user?.uid}
               siteId={siteId}
               site={data?.site}
            />
            <SiteTableSkeleton />
         </DashboardShell>
      );
   }

   return (
      <DashboardShell>
         <SiteFeedbackTableHeader
            isSiteOwner={data?.site?.authorId === user?.uid}
            siteId={siteId}
            site={data?.site}
         />
         {data.feedback ? (
            <FeedbackTable allFeedback={data.feedback} />
         ) : (
            <FeedbackEmptyState siteId={siteId} />
         )}
      </DashboardShell>
   );
};

const SiteFeedbackPage = () => (
   <Page name="new feedback" path="/feedback">
      <SiteFeedback />
   </Page>
);

export default SiteFeedbackPage;
