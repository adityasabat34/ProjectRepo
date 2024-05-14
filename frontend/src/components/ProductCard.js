import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import Rating from './Rating';
import { Link as RouterLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecor: 'none' }}
    >
      <Box
        borderRadius="lg"
        border="solid black 1px"
        bgColor="white"
        _hover={{ shadow: 'lg' }}
        width="full" // Adjust width to fill available space
      >
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="auto" // Set height to auto for responsive image
          objectFit="cover"
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
        />
        <Flex py="5" px="4" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize="md" mb="3">
            {' '}
            {/* Adjust font size */}
            {product.name}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Rating color="yellow.500" value={product.rating} />
            <Text fontSize="md" fontWeight="bold" color="blue.600">
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default ProductCard;
