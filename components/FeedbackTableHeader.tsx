import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Flex,
   Heading,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

const FeedbackTableHeader = () => {
   return (
      <>
         <Breadcrumb>
            <BreadcrumbItem>
               <NextLink href="/feedback" passHref>
                  <BreadcrumbLink href="">Feedback</BreadcrumbLink>
               </NextLink>
            </BreadcrumbItem>
         </Breadcrumb>
         <Flex justifyContent="space-between">
            <Heading mb={8}>My Sites Feedback</Heading>
         </Flex>
      </>
   );
};

export default FeedbackTableHeader;
