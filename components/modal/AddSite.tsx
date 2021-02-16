import React from 'react';
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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { createSite } from '@/lib/firestore';

interface AddSiteProps {}

export const AddSite: React.FC<AddSiteProps> = ({}) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const initialRef = React.useRef();
   const { register, handleSubmit } = useForm();
   const onCreateSite = (data) => createSite(data);

   return (
      <>
         <Button
            onClick={onOpen}
            fontWeight="medium"
            maxW="200px"
            variant="outline"
            size="md"
            color="black"
         >
            Add Your First Site
         </Button>

         <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
               <ModalHeader fontWeight="bold">Add Site</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <FormControl>
                     <FormLabel>Name</FormLabel>
                     <Input
                        placeholder="My Site"
                        name="site"
                        ref={register({ required: true })}
                     />
                  </FormControl>

                  <FormControl mt={4}>
                     <FormLabel>Link</FormLabel>
                     <Input
                        placeholder="https://website.com"
                        name="url"
                        ref={register({ required: true })}
                     />
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
                     Create
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default AddSite;
