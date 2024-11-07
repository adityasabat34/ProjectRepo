import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecor: "none" }}
    >
      <Box
        borderRadius="lg"
        border="solid black 1px"
        bgColor="white"
        _hover={{ shadow: "lg" }}
        display="flex"
        flexDirection="column"
      >
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h={{ base: "200px", md: "250px" }} // Responsive height
          objectFit="cover"
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
        />
        <Flex py="2" px="2" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize={{ base: "sm", md: "lg" }} mb="3">
            {product.name}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Rating color="yellow.500" value={product.rating} />
            <Text
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="bold"
              color="blue.600"
            >
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default ProductCard;
