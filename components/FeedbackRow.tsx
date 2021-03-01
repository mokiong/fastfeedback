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
      mutate(['/api/feedback', auth.user.token]);
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
               isChecked={status === 'active'}
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
