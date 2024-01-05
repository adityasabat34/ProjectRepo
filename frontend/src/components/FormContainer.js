import { Flex } from '@chakra-ui/react';

const FormContainer = ({ children, width = 'xl' }) => {
  return (
    <Flex
      direction="column"
      boxShadow="md"
      rounded="md"
      bgColor="white"
      p="10"
      border="1.5px solid black"
      width={width}
    >
      {children}
    </Flex>
  );
};

export default FormContainer;
