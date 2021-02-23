import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Flex,
   Heading,
} from '@chakra-ui/react';
import React from 'react';
import AddSite from './modal/AddSite';

const FeedbackTableHeader = () => {
   return (
      <>
         <Breadcrumb>
            <BreadcrumbItem>
               <BreadcrumbLink>Feedback</BreadcrumbLink>
            </BreadcrumbItem>
         </Breadcrumb>
         <Flex justifyContent="space-between">
            <Heading mb={8}>My Feedback</Heading>
         </Flex>
      </>
   );
};

export default FeedbackTableHeader;
