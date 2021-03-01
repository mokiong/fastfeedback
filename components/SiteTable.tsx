import React from 'react';
import { Table, Tr, Th, Td } from './Table';
import { format, parseISO } from 'date-fns';
import NextLink from 'next/link';

import { Box, Link } from '@chakra-ui/react';
import DeleteSiteButton from './DeleteSiteButton';

const SiteTable = ({ sites }) => {
   return (
      <Table w="full">
         <thead>
            <Tr>
               <Th>Name</Th>
               <Th>Site Link</Th>
               <Th>Rating</Th>
               <Th>Date Added</Th>
               <Th>{''}</Th>
            </Tr>
         </thead>
         <tbody>
            {sites.map((site) => (
               <Box as="tr" key={site.url}>
                  <Td>
                     <NextLink
                        href="/site/[siteId]"
                        as={`/site/${site.id}`}
                        passHref
                     >
                        <Link fontWeight="medium">{site.name}</Link>
                     </NextLink>
                  </Td>
                  <Td>{site.url}</Td>
                  <Td color="blue.500">COMING SOON!</Td>
                  <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
                  <Td>
                     <DeleteSiteButton siteId={site.id} />
                  </Td>
               </Box>
            ))}
         </tbody>
      </Table>
   );
};

export default SiteTable;
