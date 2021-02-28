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
   const { data } = useSWR(
      user ? [`/api/feedback/${query.siteId}`, user.token] : null,
      fetcher
   );

   // const author = isSiteOwner()

   if (!data) {
      return (
         <DashboardShell>
            <SiteFeedbackTableHeader
               isSiteOwner={true}
               siteId={query.siteId}
               site={data?.site}
            />
            <SiteTableSkeleton />
         </DashboardShell>
      );
   }

   return (
      <DashboardShell>
         <SiteFeedbackTableHeader
            isSiteOwner={true}
            siteId={query.siteId}
            site={data?.site}
         />
         {data.feedback ? (
            <FeedbackTable allFeedback={data.feedback} />
         ) : (
            <FeedbackEmptyState />
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
