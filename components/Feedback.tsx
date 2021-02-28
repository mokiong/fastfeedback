import { Box, Heading, Text, Divider, Flex } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import React from 'react';
import GithubIcon from './icons/GithubIcon';
import GoogleIcon from './icons/GoogleIcon';

const Feedback = ({ author, text, createdAt, settings, provider }) => {
   return (
      <Box borderRadius={4} maxW="700px" w="full" mt={4}>
         <Flex align="center">
            <Heading
               size="sm"
               as="h3"
               mb={0}
               color="gray.900"
               fontWeight="medium"
            >
               {author}
            </Heading>
            {settings?.icons && (
               <Box>
                  {provider.slice(0, -4) === 'google' ? (
                     <GoogleIcon boxSize="13px" ml="6px" />
                  ) : (
                     <GithubIcon boxSize="13px" ml="6px" />
                  )}
               </Box>
            )}
         </Flex>
         {settings?.timestamps && (
            <Text color="gray.500" mb={4} fontSize="xs">
               {format(parseISO(createdAt), 'PPpp')}
            </Text>
         )}
         <Text color="gray.800" mb={4}>
            {text}{' '}
         </Text>
         <Divider borderColor="gray.200" bgColor=""></Divider>
      </Box>
   );
};

export default Feedback;
