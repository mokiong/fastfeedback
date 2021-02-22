import Head from 'next/head';
import React from 'react';
import { Button, Code, Heading, Text, Flex } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import LogoIcon from '@/components/icons/logo';

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

         <LogoIcon color="black" name="logo" boxSize="32px"></LogoIcon>
         {(auth as any)?.user ? (
            <>
               <Button onClick={(e) => (auth as any).signout()}>
                  Sign Out
               </Button>
            </>
         ) : (
            <Button
               mt={4}
               size="sm"
               onClick={(e) => (auth as any).signinWithGithub()}
            >
               Sign In
            </Button>
         )}
         {/* {(auth as any)?.user && <Flex>{auth.user}</Flex>} */}
      </Flex>
   );
};

export default index;
