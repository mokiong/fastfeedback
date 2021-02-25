import Head from 'next/head';
import React from 'react';
import { Button, Flex, Stack, Box } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import LogoIcon from '@/components/icons/logo';
import GithubIcon from '@/components/icons/GithubIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { getAllFeedBack } from '@/lib/db-admin';
import FeedbackLink from '@/components/FeedbackLink';
import Feedback from '@/components/Feedback';

interface indexProps {}

const SITE_ID = '26XYyadLo7H2MTgxbyMg';

const Home = ({ allFeedback }) => {
   const auth = useAuth();

   return (
      <>
         <Box bg="gray.100">
            <Flex
               as="main"
               direction="column"
               align="center"
               justify="center"
               h="50vh"
            >
               <Head>
                  <script
                     dangerouslySetInnerHTML={{
                        __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `,
                     }}
                  />
               </Head>

               <LogoIcon color="black" name="logo" boxSize="64px"></LogoIcon>
               {(auth as any)?.user ? (
                  <Button
                     mt={6}
                     as="a"
                     href="/dashboard"
                     backgroundColor="gray.900"
                     color="white"
                     fontWeight="medium"
                     _hover={{ bg: 'gray.700' }}
                     _active={{
                        bg: 'gray.800',
                        transform: 'scale(0.95)',
                     }}
                  >
                     View Dashboard
                  </Button>
               ) : (
                  <Stack spacing={4} mt={6}>
                     <Button
                        leftIcon={<GithubIcon boxSize="20px" />}
                        onClick={() => (auth as any).signinWithGithub()}
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        _hover={{ bg: 'gray.700' }}
                        _active={{
                           bg: 'gray.800',
                           transform: 'scale(0.95)',
                        }}
                     >
                        Sign In with Github
                     </Button>
                     <Button
                        leftIcon={<GoogleIcon boxSize="20px" />}
                        onClick={() => (auth as any).signinWithGoogle()}
                        backgroundColor="white"
                        color="gray.900"
                        variant="outline"
                        fontWeight="medium"
                        _hover={{ bg: 'gray.100' }}
                        _active={{
                           bg: 'gray.100',
                           transform: 'scale(0.95)',
                        }}
                     >
                        Sign In with Google
                     </Button>
                  </Stack>
               )}
            </Flex>
         </Box>
         <Box
            display="flex"
            flexDirection="column"
            width="full"
            maxWidth="700px"
            margin="0 auto"
            mt={8}
         >
            <FeedbackLink siteId={SITE_ID} />
            {allFeedback.map((feed) => (
               <Feedback key={feed.id} {...feed} />
            ))}
         </Box>
      </>
   );
};

export async function getStaticProps(context) {
   const data = await getAllFeedBack(SITE_ID);

   return {
      props: {
         allFeedback: data ? data.feedback : [],
      },
      revalidate: 1,
   };
}

export default Home;
