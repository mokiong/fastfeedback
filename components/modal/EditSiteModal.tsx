import React from 'react';
import { mutate } from 'swr';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   FormControl,
   FormLabel,
   Input,
   useDisclosure,
   useToast,
   Switch,
   Flex,
   Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { updateSite } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';
import { SettingsIcon } from '@chakra-ui/icons';

export const EditSite = ({ settings, siteId, children }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();
   const auth = useAuth();
   const initialRef = React.useRef();
   const { register, handleSubmit } = useForm();

   const onEditSite = async (fields) => {
      await updateSite(siteId, { settings: fields });
      toast({
         title: 'Success!',
         description: "We've updated your site.",
         status: 'success',
         duration: 5000,
         isClosable: true,
      });
      mutate([`/api/sites/${siteId}`, auth.user.token]);
      onClose();
   };

   return (
      <>
         <Button
            leftIcon={<SettingsIcon />}
            onClick={onOpen}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
               bg: 'gray.800',
               transform: 'scale(0.95)',
            }}
         >
            {children}
         </Button>
         <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onEditSite)}>
               <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <FormControl>
                     <Flex align="center">
                        <Switch
                           name="ratings"
                           ref={register()}
                           id="show-ratings"
                           colorScheme="green"
                           defaultChecked={settings?.ratings}
                        />
                        <FormLabel ml={4} htmlFor="show-ratings">
                           Show Ratings
                        </FormLabel>
                     </Flex>
                  </FormControl>
                  <FormControl>
                     <Flex align="center">
                        <Switch
                           name="icons"
                           ref={register()}
                           id="show-icons"
                           colorScheme="green"
                           defaultChecked={settings?.icons}
                        />
                        <FormLabel ml={4} htmlFor="show-icons">
                           Show Icons
                        </FormLabel>
                     </Flex>
                  </FormControl>
                  <FormControl>
                     <Flex align="center">
                        <Switch
                           name="timestamps"
                           ref={register()}
                           id="show-timestamps"
                           colorScheme="green"
                           defaultChecked={settings?.timestamps}
                        />
                        <FormLabel ml={4} htmlFor="show-timestamps">
                           Show Timestamp
                        </FormLabel>
                     </Flex>
                  </FormControl>
               </ModalBody>

               <ModalFooter>
                  <Button onClick={onClose} mr={3} fontWeight="medium">
                     Cancel
                  </Button>
                  <Button
                     backgroundColor="#99FFFE"
                     color="#194D4C"
                     fontWeight="medium"
                     type="submit"
                  >
                     Update
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default EditSite;
