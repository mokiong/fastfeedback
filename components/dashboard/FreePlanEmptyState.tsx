import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import DashboardShell from './shell';

const FreePlanEmptyState: React.FC<{}> = () => {
   return (
      <DashboardShell>
         <Box width="100%" backgroundColor="white" borderRadius="8px" p={8}>
            <Heading color="black" size="md">
               Get feedback on your site instantly
            </Heading>
            <Text color="black">Start today, then grow us</Text>
            <Button variant="solid" size="md" color="black">
               Upgrade to Starter
            </Button>
         </Box>
      </DashboardShell>
   );
};

export default FreePlanEmptyState;
