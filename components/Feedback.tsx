import { Box, Heading, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import React from 'react';

const Feedback = ({ author, text, createdAt }) => {
   return (
      <Box borderRadius={4} maxW="700px" w="full" mt={4}>
         <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
            {author}
         </Heading>
         <Text color="gray.500" mb={4} fontSize="xs">
            {format(parseISO(createdAt), 'PPpp')}
         </Text>
         <Text color="gray.800" mb={4}>
            {text}{' '}
         </Text>
         <Divider borderColor="gray.200" bgColor=""></Divider>
      </Box>
   );
};

export default Feedback;
