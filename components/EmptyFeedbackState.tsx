import { Heading, Text, Flex } from '@chakra-ui/react';
import React from 'react';

interface EmptyStateProps {}

const EmptyFeedbackState: React.FC<EmptyStateProps> = ({}) => {
   return (
      <Flex
         w="100%"
         justify="center"
         backgroundColor="white"
         borderRadius="8px"
         p={16}
         direction="column"
         align="center"
      >
         <Heading size="lg" mb={2}>
            No feedbacks yet to any of your sites.
         </Heading>
         <Text mb={4}>Dont worry! Patience is a virtue.</Text>
      </Flex>
   );
};

export default EmptyFeedbackState;
