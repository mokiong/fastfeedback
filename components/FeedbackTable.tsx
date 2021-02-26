import React from 'react';
import FeedbackRow from './FeedbackRow';
import { Table, Th, Tr } from './Table';

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
               <FeedbackRow key={feedback.id} {...feedback} />
            ))}
         </tbody>
      </Table>
   );
};

export default FeedbackTable;
