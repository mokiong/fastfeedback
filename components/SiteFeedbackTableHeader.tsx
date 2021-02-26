import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Flex,
   Heading,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

const SiteFeedbackTableHeader = ({ siteName }) => {
   return (
      <>
         <Breadcrumb>
            <BreadcrumbItem>
               <NextLink href="/feedback" passHref>
                  <BreadcrumbLink href="">Feedback</BreadcrumbLink>
               </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
               <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
            </BreadcrumbItem>
         </Breadcrumb>
         <Flex justifyContent="space-between">
            <Heading mb={8}>{siteName || '-'}</Heading>
         </Flex>
      </>
   );
};

export default SiteFeedbackTableHeader;
