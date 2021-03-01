import React from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/firestore';
import DashboardShell from '@/components/dashboard/shell';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';
import useSWR, { mutate } from 'swr';

const SiteFeedback = () => {
   const auth = useAuth();
   const router = useRouter();
   const inputEl = React.useRef(null);

   const { siteId } = router.query;

   const { data: feedbackData } = useSWR(`/api/feedback/${siteId}`);
   const { data: siteData } = useSWR(`/api/site/${siteId}`);
   const allFeedback = feedbackData?.feedback;
   const site = siteData?.site;
   const onSubmit = (e) => {
      e.preventDefault();
      let newFeedBack = {
         siteId: siteId,
         route: '/',
         siteUrl: site.url,
         author: auth.user.name,
         authorId: auth.user.uid,
         text: inputEl.current.value,
         createdAt: new Date().toISOString(),
         provider: auth.user.provider,
         status: 'active',
      };
      const createdFeed = createFeedback(newFeedBack);
      inputEl.current.value = '';
      console.log('allFeedback', allFeedback);

      allFeedback
         ? mutate(`/api/feedback/${siteId}`, async (data) => ({
              feedback: [
                 { id: createdFeed.id, ...newFeedBack },
                 ...data.feedback,
              ],
           }))
         : mutate(`/api/feedback/${siteId}`, async (data) => ({
              feedback: [{ id: createdFeed.id, ...newFeedBack }],
           }));
   };

   return (
      <DashboardShell>
         <SiteFeedbackTableHeader
            isSiteOwner={site?.authorId === auth?.user?.uid}
            site={site}
            siteId={siteId}
         />
         <Box
            display="flex"
            flexDirection="column"
            width="full"
            maxW="700px"
            margin="0 auto"
         >
            <Box as="form" onSubmit={onSubmit}>
               <FormControl my={8}>
                  <FormLabel htmlFor="comment">Comment</FormLabel>
                  <Input ref={inputEl} type="comment" id="comment" />
                  <Button
                     mt={2}
                     type="submit"
                     fontWeight="medium"
                     isDisabled={router.isFallback}
                  >
                     Add Comment
                  </Button>
               </FormControl>
            </Box>
            {allFeedback &&
               allFeedback.map((feedback) => (
                  <Feedback
                     provider={auth?.user?.provider}
                     settings={site?.settings}
                     key={feedback.id}
                     {...feedback}
                  />
               ))}
         </Box>
      </DashboardShell>
   );
};

export default SiteFeedback;
