import { useAuth } from '@/lib/auth';
import {
   Avatar,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Flex,
   Heading,
   Link,
   Button,
   Stack,
} from '@chakra-ui/react';
import React from 'react';
import LogoIcon from '../icons/logo';
import AddSite from '../modal/AddSite';

const DashboardShell: React.FC<{}> = ({ children }) => {
   const auth = useAuth();
   console.log('auth at shell:', auth);

   return (
      <Flex flexDirection="column">
         <Flex
            flexDirection="row"
            justifyContent="space-between"
            backgroundColor="white"
            alignItems="center"
            py={4}
            px={8}
         >
            <Stack spacing={4} isInline align="center">
               <LogoIcon boxSize="24px" />
               <Link>Feedback</Link>
               <Link>Sites</Link>
            </Stack>
            <Flex alignItems="center" justifyContent="center">
               {auth?.user && (
                  <Button
                     variant="ghost"
                     onClick={() => auth?.signout()}
                     mr={4}
                  >
                     Log Out
                  </Button>
               )}
               <Avatar size="sm" src={auth?.user?.photoUrl} />
            </Flex>
         </Flex>
         <Flex margin="0 auto" direction="column" p={8} maxWidth="1250px">
            <Breadcrumb>
               <BreadcrumbItem>
                  <BreadcrumbLink>Sites</BreadcrumbLink>
               </BreadcrumbItem>
            </Breadcrumb>
            <Flex justifyContent="space-between">
               <Heading mb={8}>My Sites</Heading>
               <AddSite> + Add Site </AddSite>
            </Flex>
            {children}
         </Flex>
      </Flex>
   );
};

export default DashboardShell;
