import { useAuth } from '@/lib/auth';
import {
   Avatar,
   Box,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Button,
   Flex,
   Heading,
   Link,
   Stack,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import LogoIcon from '../icons/logo';

const DashboardShell: React.FC<{}> = ({ children }) => {
   const auth = useAuth();
   console.log(auth.user);
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
            <Flex alignItems="center">
               <Link mr={4}>Account</Link>
               <Avatar size="sm" src={auth.user.photoURL} />
            </Flex>
         </Flex>
         <Flex backgroundColor="gray.100" p={8} height="100vh">
            <Flex
               maxWidth="800px"
               w="100%"
               ml="auto"
               mr="auto"
               direction="column"
            >
               <Breadcrumb>
                  <BreadcrumbItem isCurrentPage>
                     <BreadcrumbLink color="gray.700" fontSize="sm">
                        Sites
                     </BreadcrumbLink>
                  </BreadcrumbItem>
               </Breadcrumb>
               <Heading color="black" mb={4}>
                  Sites
               </Heading>
               {children}
            </Flex>
         </Flex>
      </Flex>
   );
};

export default DashboardShell;
