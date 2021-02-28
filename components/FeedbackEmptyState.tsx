import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/react';

const FeedbackEmptyState = ({ siteId }) => {
   return (
      <Flex
         width="100%"
         backgroundColor="white"
         borderRadius="8px"
         p={16}
         justify="center"
         align="center"
         direction="column"
      >
         <Heading size="lg" mb={4}>
            There isn't any feedback.
         </Heading>
         <Button
            as="a"
            href={`/site/${siteId}`}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
               bg: 'gray.800',
               transform: 'scale(0.95)',
            }}
         >
            Add Feedback
         </Button>
      </Flex>
   );
};

export default FeedbackEmptyState;
