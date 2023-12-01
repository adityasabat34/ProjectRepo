import { Flex, Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Spinner
        thickness="3px"
        speed="0.45s"
        emptyColor="gray.200"
        color="red.900"
        size="xl"
      />
    </Flex>
  );
};

export default Loader;
