import { Box, Heading, Button, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import AddSite from '../modal/AddSite';

interface EmptyStateProps {}

const EmptyState: React.FC<EmptyStateProps> = ({}) => {
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
            You haven't added any sites.
         </Heading>
         <Text mb={4}>Welcome! Let's get started.</Text>
         <AddSite>Add Your First Site</AddSite>
      </Flex>
   );
};

export default EmptyState;
