import {
  useParams,
  useSearchParams,
  useNavigate,
  Link as RouterLink,
} from 'react-router-dom';
import {
  Box,
  Link,
  Text,
  Flex,
  Grid,
  Select,
  Button,
  Icon,
  Image,
  Heading,
} from '@chakra-ui/react';
import { addToCart, removeFromCart } from '../actions/cartAction';
import Message from '../components/Message';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoTrashBinSharp } from 'react-icons/io5';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  let qty = searchParams.get('qty');

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, +qty));
    }
  }, [dispatch, qty, id]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  };

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '1fr 1fr' }}
      gap={{ base: '5', md: '10' }}
    >
      <Box>
        <Heading mb="8" textAlign="center">
          Shopping Cart
        </Heading>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty.{' '}
            <Link as={RouterLink} to="/">
              Go Back
            </Link>
          </Message>
        ) : (
          <Flex direction="column" gap="5px">
            {cartItems.map((item) => (
              <Flex
                key={item.product}
                alignItems="center"
                justifyContent="space-between"
                borderBottom="1px"
                borderColor="gray.200"
                py="4"
                px="2"
                rounded="lg"
                _hover={{ bgColor: 'gray.50' }}
                border="1.5px solid black"
              >
                {/* Product Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  borderRadius="lg"
                  height="14"
                  width="14"
                  objectFit="cover"
                  border="0.2px solid black"
                />

                {/* Product Name and Price */}
                <Flex direction="column" flex="1" ml="4">
                  <Text fontWeight="semibold" fontSize="md">
                    <Link as={RouterLink} to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Text>
                  <Text fontWeight="semibold" fontSize="md" color="blue.600">
                    ₹{item.price}
                  </Text>
                </Flex>

                {/* Quantity Select Box */}
                <Select
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, +e.target.value))
                  }
                  width="14"
                  border="1.5px solid black"
                >
                  {[...Array(item.countInStock).keys()].map((i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </Select>

                {/* Delete Button */}
                <Button
                  type="button"
                  colorScheme="red"
                  onClick={() => removeFromCartHandler(item.product)}
                  border="0.2px solid black"
                  ml="4"
                >
                  <Icon as={IoTrashBinSharp} />
                </Button>
              </Flex>
            ))}
          </Flex>
        )}
      </Box>

      <Flex
        direction="column"
        bgColor="gray.200"
        rounded="md"
        padding="5"
        height="fit-content"
        justifyContent="space-between"
        border="1px solid black"
        mt="20"
      >
        <Heading
          as="h2"
          fontSize={{ base: 'xl', md: '2xl' }}
          mb="2"
          textAlign="center"
        >
          Subtotal ({cartItems.reduce((acc, currVal) => acc + currVal.qty, 0)}{' '}
          items)
        </Heading>
        <Text
          fontWeight="bold"
          fontSize={{ base: 'xl', md: '2xl' }}
          color="blue.600"
          mb="4"
          textAlign="center"
        >
          ₹
          {cartItems.reduce(
            (acc, currVal) => acc + currVal.qty * currVal.price,
            0
          )}
        </Text>

        <Button
          type="button"
          disabled={cartItems.length === 0}
          size="lg"
          colorScheme="blackAlpha"
          bgColor="red.900"
          onClick={checkoutHandler}
          mx="auto"
        >
          Proceed to checkout
        </Button>
      </Flex>
    </Grid>
  );
};

export default CartScreen;
