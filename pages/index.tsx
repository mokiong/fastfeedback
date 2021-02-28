import Head from 'next/head';
import React from 'react';
import { Button, Flex, Stack, Box } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import LogoIcon from '@/components/icons/logo';
import GithubIcon from '@/components/icons/GithubIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { getPopularSites, getUser } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import SiteRowIndex from '@/components/SiteRowIndex';
import PopularSiteRow from '@/components/PopularSiteRow';

interface indexProps {}

const Home = ({ popularSites }) => {
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
            window.location.href = "/sites"
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
                     href="/sites"
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
            <SiteRowIndex />
            {popularSites.map((site) => (
               <PopularSiteRow key={site.id} {...site} />
            ))}
         </Box>
      </>
   );
};

export async function getServerSideProps(context) {
   const { sites, error } = await getPopularSites();
   const popularSites = [];

   for (const site of sites) {
      const { user } = await getUser(site.authorId);
      popularSites.push({
         siteName: site.name,
         author: user.name,
         provider: user.provider,
         photoUrl: user.photoUrl,
         // ratings: site?.ratings,
         ratings: 0,
      });
   }
   // const popularSites = sites.map(async (site) => {
   //    const { user } = await getUser(site.authorId);
   //    return {
   //       siteName: site.name,
   //       author: user.name,
   //       provider: user.provider,
   //       ratings: site?.ratings,
   //    };
   // });
   console.log('popularSites', popularSites);

   return {
      props: {
         popularSites: error ? [] : popularSites,
      },
   };
}

export default Home;
