import React from 'react';
import { Table, Tr, Th, Td } from './Table';

import { Box, Code, Switch } from '@chakra-ui/react';
import RemoveButton from './RemoveButton';

const FeedbackTable = ({ allFeedback }) => {
   return (
      <Table w="full">
         <thead>
            <Tr>
               <Th minW="150px">Name</Th>
               <Th>Feedback</Th>
               <Th>Route</Th>
               <Th>Visible</Th>
               <Th width="50px">{''}</Th>
            </Tr>
         </thead>
         <tbody>
            {allFeedback.map((feedback) => (
               <Box as="tr" key={feedback.id}>
                  <Td fontWeight="medium">{feedback.author}</Td>
                  <Td>{feedback.text}</Td>
                  <Td>
                     <Code>{'/'}</Code>
                  </Td>
                  <Td>
                     <Switch
                        colorScheme="green"
                        defaultChecked={feedback.status === 'active'}
                     />
                  </Td>
                  <Td>
                     <RemoveButton feedbackId={feedback.id} />
                  </Td>
               </Box>
            ))}
         </tbody>
      </Table>
   );
};

export default FeedbackTable;
