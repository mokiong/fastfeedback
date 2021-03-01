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
import { deleteFeedback, deleteSite } from '@/lib/firestore';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

const DeleteSiteButton = ({ siteId }) => {
   const [isOpen, setIsOpen] = useState(false);
   const cancelRef = useRef();
   const auth = useAuth();

   const onClose = () => setIsOpen(false);
   const onDeleteFeedback = () => {
      deleteSite(siteId);
      mutate(
         ['/api/sites', auth.user.token],
         (data) => {
            return {
               sites: data.sites.filter((site) => site.id !== siteId),
            };
         },
         false
      );
      onClose();
   };

   return (
      <>
         <IconButton
            aria-label="Delete site"
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
                     Delete Site
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     Are you sure? This will also delete all of the site's
                     feedback as well.
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

export default DeleteSiteButton;
