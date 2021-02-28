import { Flex, Link, Text } from '@chakra-ui/react';

const SiteRowIndex = () => {
   return (
      <Flex justifyContent="space-between" mb={8} w="full" mt={1}>
         <Text fontWeight="bold" fontSize="sm">
            Popular Sites
         </Text>
         <Link fontSize="xs" color="blackAlpha.500" href="/">
            Powered by Fast Feedback
         </Link>
      </Flex>
   );
};

export default SiteRowIndex;
