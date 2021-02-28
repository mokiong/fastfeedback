import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Flex,
   Heading,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import AddSite from './modal/AddSite';
import EditSite from './modal/EditSiteModal';

const SiteFeedbackTableHeader = ({ isSiteOwner, site, siteId }) => {
   const siteName = site?.name;
   const settings = site?.settings;
   console.log('settings', site?.settings);

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
            {isSiteOwner && (
               <EditSite settings={settings} siteId={siteId}>
                  {' '}
                  Edit Site{' '}
               </EditSite>
            )}
         </Flex>
      </>
   );
};

export default SiteFeedbackTableHeader;
