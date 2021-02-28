import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Flex,
   Heading,
} from '@chakra-ui/react';
import React from 'react';
import AddSite from './modal/AddSite';

const SiteTableHeader = () => {
   return (
      <>
         <Breadcrumb>
            <BreadcrumbItem>
               <BreadcrumbLink>Sites</BreadcrumbLink>
            </BreadcrumbItem>
         </Breadcrumb>
         <Flex justifyContent="space-between">
            <Heading mb={8}>My Sites</Heading>
            <AddSite> + Add Site </AddSite>
         </Flex>
      </>
   );
};

export default SiteTableHeader;
