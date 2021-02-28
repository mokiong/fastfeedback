import { Box, Divider, Flex, Heading, Text, Avatar } from '@chakra-ui/react';

import React from 'react';
import GithubIcon from './icons/GithubIcon';
import GoogleIcon from './icons/GoogleIcon';

const PopularSiteRow = ({ siteName, author, provider, photoUrl, ratings }) => {
   return (
      <Box borderRadius={4} maxW="700px" w="full" mt={4}>
         <Flex align="center">
            <Avatar
               w={['2rem', '5rem']}
               h={['2rem', '5rem']}
               mb={4}
               src={photoUrl}
            />
            <Flex ml={3} direction="column">
               <Heading
                  size="lg"
                  as="h3"
                  mb={0}
                  color="gray.900"
                  fontWeight="medium"
               >
                  {siteName}
               </Heading>
               <Flex align="center">
                  <Text color="gray.800">{author} </Text>
                  {provider.slice(0, -4) === 'google' ? (
                     <GoogleIcon boxSize="13px" ml="6px" />
                  ) : (
                     <GithubIcon boxSize="13px" ml="6px" />
                  )}
               </Flex>
            </Flex>
            <Flex ml="auto">Rating</Flex>
         </Flex>

         <Divider borderColor="gray.200" bgColor="white"></Divider>
      </Box>
   );
};

export default PopularSiteRow;
