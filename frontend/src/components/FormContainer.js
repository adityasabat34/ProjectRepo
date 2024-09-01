import { Flex } from '@chakra-ui/react';

const FormContainer = ({ children, width = 'xl' }) => {
  return (
    <Flex
      direction="column"
      boxShadow="md"
      rounded="md"
      bgColor="white"
      p={{ base: '6', md: '12' }}
      border="1.5px solid black"
      width={{ base: '95%', md: width }}
      maxWidth="lg"
      mx="auto"
    >
      {children}
    </Flex>
  );
};

export default FormContainer;
