import { useAuth } from '@/lib/auth';
import { Avatar, Box, Flex, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import LogoIcon from '../icons/logo';

const DashboardShell = ({ children }) => {
   const { user } = useAuth();

   return (
      <Box backgroundColor="gray.100" h="100vh">
         <Flex
            backgroundColor="white"
            mb={[8, 16]}
            w="full"
            borderTop="5px solid #0AF5F4"
         >
            <Flex
               alignItems="center"
               justifyContent="space-between"
               pt={4}
               pb={4}
               maxW="1250px"
               margin="0 auto"
               w="full"
               px={8}
               h="60px"
            >
               <Flex align="center">
                  <NextLink href="/" passHref>
                     <Link mr={4}>
                        <LogoIcon boxSize="24px" />
                     </Link>
                  </NextLink>
                  <NextLink href="/sites" passHref>
                     <Link mr={4}>Sites</Link>
                  </NextLink>
                  <NextLink href="/feedback" passHref>
                     <Link mr={4}>Feedback</Link>
                  </NextLink>
                  <NextLink href="/my-sites" passHref>
                     <Link>My Sites</Link>
                  </NextLink>
               </Flex>
               <Flex justifyContent="center" alignItems="center">
                  {/* <NextLink href="/account" passHref> */}
                  {user && (
                     <Button as="a" variant="ghost" href="/account" mr={4}>
                        Account
                     </Button>
                  )}
                  {/* <Link> */}
                  <Avatar size="sm" src={user?.photoUrl} />
                  {/* </Link> */}
                  {/* </NextLink> */}
               </Flex>
            </Flex>
         </Flex>
         <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
            {children}
         </Flex>
      </Box>
   );
};

export default DashboardShell;
