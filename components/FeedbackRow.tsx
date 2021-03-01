import React from 'react';
import { Td } from './Table';

import { Box, Code, Switch } from '@chakra-ui/react';
import RemoveButton from './RemoveButton';
import { updateFeedback } from '@/lib/firestore';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

const FeedbackRow = ({ id, author, text, status, siteUrl }) => {
   const auth = useAuth();
   const [checked, setChecked] = React.useState(status === 'active');
   const toggleFeedback = () => {
      updateFeedback(id, { status: !checked ? 'active' : 'pending' });
      // mutate(`/api/my-feedbacks`, auth.user.token);

      mutate(
         ['/api/my-feedbacks', auth?.user?.token],
         (data) => {
            data.feedback.forEach((feedback) => {
               if (feedback.id === id) {
                  console.log('hello');
                  feedback.status = checked ? 'active' : 'pending';
               }
            });
            return {
               feedback: data.feedback,
            };
         },
         false
      );
      console.log('status', status);
      console.log('checked', checked);
      setChecked(!checked);
   };

   return (
      <Box as="tr" key={id}>
         <Td fontWeight="medium">{author}</Td>
         <Td>{text}</Td>
         <Td>
            <Code>{siteUrl || '/'}</Code>
         </Td>
         <Td>
            <Switch
               colorScheme="green"
               isChecked={checked}
               onChange={toggleFeedback}
            />
         </Td>
         <Td>
            <RemoveButton feedbackId={id} />
         </Td>
      </Box>
   );
};

export default FeedbackRow;
