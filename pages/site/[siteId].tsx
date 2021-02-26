import React from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { getAllFeedBack, getAllSites } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/firestore';
import DashboardShell from '@/components/dashboard/shell';

const SiteFeedback = ({ initialFeedback }) => {
   const auth = useAuth();
   const router = useRouter();
   const inputEl = React.useRef(null);
   const [allFeedback, setAllFeedback] = React.useState(initialFeedback);

   const onSubmit = (e) => {
      e.preventDefault();
      const newFeedBack = {
         author: auth.user.name,
         authorId: auth.user.uid,
         siteId: router.query.siteId,
         text: inputEl.current.value,
         createdAt: new Date().toISOString(),
         provider: auth.user.provider,
         status: 'pending',
      };

      inputEl.current.value = '';
      setAllFeedback([newFeedBack, ...allFeedback]);
      createFeedback(newFeedBack);
   };

   return (
      <DashboardShell>
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
                  <Feedback key={feedback.id} {...feedback} />
               ))}
         </Box>
      </DashboardShell>
   );
};

export async function getStaticProps(context) {
   const { siteId } = context.params;
   const data = await getAllFeedBack(siteId);

   return {
      props: {
         initialFeedback: data ? data.feedback : [],
      },
      revalidate: 1,
   };
}

export async function getStaticPaths() {
   const { sites } = await getAllSites();
   const paths = sites.map((site) => ({
      params: {
         siteId: site.id.toString(),
      },
   }));

   return {
      paths,
      fallback: true,
   };
}

export default SiteFeedback;
