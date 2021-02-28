import React from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { getAllFeedBack, getAllSites, getSite } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/firestore';
import DashboardShell from '@/components/dashboard/shell';
import SiteTableHeader from '@/components/SiteTableHeader';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';

const SiteFeedback = ({ initialFeedback, site }) => {
   const auth = useAuth();
   const router = useRouter();
   const inputEl = React.useRef(null);
   const [allFeedback, setAllFeedback] = React.useState(initialFeedback);

   const { siteId } = router.query;

   const onSubmit = (e) => {
      e.preventDefault();
      let newFeedBack = {
         siteId: siteId,
         route: '/',
         author: auth.user.name,
         authorId: auth.user.uid,
         text: inputEl.current.value,
         createdAt: new Date().toISOString(),
         provider: auth.user.provider,
         status: 'pending',
      };
      const createdFeed = createFeedback(newFeedBack);
      inputEl.current.value = '';
      setAllFeedback([{ id: createdFeed.id, ...newFeedBack }, ...allFeedback]);
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

export async function getStaticProps(context) {
   const { siteId } = context.params;
   const data = await getAllFeedBack(siteId.toString(), null);
   const { site } = await getSite(siteId.toString());

   return {
      props: {
         initialFeedback: data ? data.feedback : [],
         site,
      },
      revalidate: 1,
   };
}

export async function getStaticPaths() {
   // const { sites } = await getAllSites();
   // const paths = sites.map((site) => ({
   //    params: {
   //       siteId: site.id.toString(),
   //    },
   // }));

   // return {
   //    paths,
   //    fallback: true,
   // };
   return {
      paths: [
         {
            params: {
               siteId: 'rXK1WMWSRzawxa4Tdk7g',
            },
         },
      ],
      fallback: true,
   };
}

export default SiteFeedback;
