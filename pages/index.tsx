import Head from 'next/head';
import React from 'react';
import { Button, Code, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
   const auth = useAuth();

   return (
      <div className="container">
         <Head>
            <title>Fast Feedback</title>
         </Head>
         <main>
            <Heading>Fast Feedback</Heading>
            <Text>
               Current user:{' '}
               <Code>
                  {(auth as any)?.user ? (auth as any)?.user?.email : 'None'}
               </Code>
            </Text>
            {(auth as any)?.user ? (
               <div>
                  <Button onClick={(e) => (auth as any).signout()}>
                     Sign Out
                  </Button>
               </div>
            ) : (
               <Button onClick={(e) => (auth as any).signinWithGithub()}>
                  Sign In
               </Button>
            )}
         </main>
      </div>
   );
};

export default index;
