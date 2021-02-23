import Head from 'next/head';
import React from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import LogoIcon from '@/components/icons/logo';
import GithubIcon from '@/components/icons/GithubIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
   const auth = useAuth();
   console.log('auth', auth.user);
   return (
      <Flex
         as="main"
         direction="column"
         align="center"
         justify="center"
         h="100vh"
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
            <title>Fast Feedback</title>
         </Head>

         <LogoIcon color="black" name="logo" boxSize="64px"></LogoIcon>
         {(auth as any)?.user ? (
            <Button
               mt={4}
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
            <Stack spacing={4} mt={4}>
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
   );
};

export default index;
