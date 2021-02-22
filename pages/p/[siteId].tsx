import React from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { getAllFeedBack, getAllSites } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/firestore';

const SiteFeedback = ({ initialFeedback }) => {
   const auth = useAuth();
   const router = useRouter();
   const inputEl = React.useRef(null);
   const [allFeedback, setAllFeedback] = React.useState(initialFeedback);

   const onSubmit = (e) => {
      e.preventDefault();
      const newFeedBack = {
         author: auth.user.email,
         authorId: auth.user.uid,
         siteId: router.query.siteId,
         text: inputEl.current.value,
         createdAt: new Date().toISOString(),
         provider: auth.user.provider,
         status: 'pending',
      };

      setAllFeedback([newFeedBack, ...allFeedback]);
      createFeedback(newFeedBack);
   };

   return (
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
               <Button mt={2} type="submit" fontWeight="medium">
                  Add Comment
               </Button>
            </FormControl>
         </Box>
         {allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
         ))}
      </Box>
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
   // const { sites } = await import('@/utils/siteIdUtil');
   // const paths = sites.siteIds.map((id) => ({
   //    params: {
   //       siteId: id,
   //    },
   // }));

   // // const { getAllSites } = await import('@/lib/db-admin');
   // // // const feedback = await getAllFeedBack('26XYyadLo7H2MTgxbyMg');
   // console.log(sitesa);
   // console.log('sites:', sites);

   const { sites } = await getAllSites();
   const paths = sites.map((site) => ({
      params: {
         siteId: site.id.toString(),
      },
   }));

   return {
      paths,
      fallback: false,
   };

   // return {
   //    paths,
   //    fallback: false,
   // };
}

// export async function getStaticPaths() {
//    const { getAllSites } = await import('@/lib/db-admin');

//    const sites = await getAllSites();

//    const paths = sites.map((site) => ({
//       params: {
//          siteId: site.id.toString(),
//       },
//    }));

//    return {
//       paths,
//       fallback: false,
//    };
// }

export default SiteFeedback;
