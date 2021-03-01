import React, { useState, useRef } from 'react';
import {
   Button,
   AlertDialog,
   AlertDialogOverlay,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogBody,
   AlertDialogFooter,
   IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteFeedback } from '@/lib/firestore';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

const RemoveButton = ({ feedbackId }) => {
   const [isOpen, setIsOpen] = useState(false);
   const cancelRef = useRef();
   const auth = useAuth();

   const onClose = () => setIsOpen(false);
   const onDeleteFeedback = () => {
      deleteFeedback(feedbackId);
      // TODO: fix cache for this
      // mutate(
      //    ['/api/feedback', auth.user.token],
      //    (data) => {
      //       return {
      //          feedback: data.feedback.filter(
      //             (feedback) => feedback.id !== feedbackId
      //          ),
      //       };
      //    },
      //    false
      // );
      onClose();
   };

   return (
      <>
         <IconButton
            aria-label="Delete feedback"
            icon={<DeleteIcon />}
            variant="ghost"
            onClick={() => setIsOpen(true)}
         />
         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     Delete Feedback
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button
                        fontWeight="bold"
                        colorScheme="red"
                        onClick={onDeleteFeedback}
                        ml={3}
                     >
                        Delete
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   );
};

export default RemoveButton;
