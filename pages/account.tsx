import DashboardShell from '@/components/dashboard/shell';
import { useAuth } from '@/lib/auth';
import { Avatar, Flex, Heading, Text, Box, Button } from '@chakra-ui/react';
import React from 'react';

interface dashboardProps {}

const Account: React.FC<dashboardProps> = ({}) => {
   const { user, signout } = useAuth();
   // const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

   // if (!data) {
   //    return (
   //       <DashboardShell>
   //          <SiteTableHeader />
   //          <SiteTableSkeleton />
   //       </DashboardShell>
   //    );
   // }

   return (
      <DashboardShell>
         <Flex
            direction="column"
            maxW="600px"
            align={['left', 'center']}
            margin="0 auto"
         >
            <Flex direction="column" align={['left', 'center']} ml={4}>
               <Avatar
                  w={['3rem', '6rem']}
                  h={['3rem', '6rem']}
                  mb={4}
                  src={user?.photoUrl}
               />
               <Heading letterSpacing="-1px">{user?.name}</Heading>
               <Text>{user?.email}</Text>
               <Button
                  size="lg"
                  mt={8}
                  onClick={() => signout()}
                  backgroundColor="gray.900"
                  color="white"
                  fontWeight="medium"
                  _hover={{ bg: 'gray.700' }}
                  _active={{
                     bg: 'gray.800',
                     transform: 'scale(0.95)',
                  }}
               >
                  Log out
               </Button>
            </Flex>
         </Flex>
         <Box></Box>
      </DashboardShell>
   );
};

export default Account;
