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

  //   console.log(id, qty);

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
    <Grid>
      <Box>
        <Heading mb="8">Shopping Cart</Heading>
        <Flex>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty.{' '}
              <Link as={RouterLink} to="/">
                Go Back
              </Link>
            </Message>
          ) : (
            <Grid templateColumns="4fr 2fr" gap="10" w="full">
              <Flex direction="column">
                {cartItems.map((item) => (
                  <Grid
                    key={item.product}
                    size="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px"
                    borderColor="gray.200"
                    border="0.5px solid black"
                    py="4"
                    px="2"
                    rounded="lg"
                    _hover={{ bgColor: 'gray.50' }}
                    templateColumns="1fr 4fr 2fr 2fr 2fr"
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

                    {/* Product Name */}
                    <Text fontWeight="semibold" fontSize="lg">
                      <Link as={RouterLink} to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Text>

                    {/* Product Price */}
                    <Text fontWeight="semibold" fontSize="lg">
                      ₹{item.price}
                    </Text>

                    {/* Quantity Select Box */}
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                      width="20"
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
                    >
                      <Icon as={IoTrashBinSharp} />
                    </Button>
                  </Grid>
                ))}
              </Flex>

              {/* Second Column */}
              <Flex
                direction="column"
                bgColor="gray.200"
                rounded="md"
                padding="5"
                height="48"
                justifyContent="space-between"
                border="1px solid black"
              >
                <Flex direction="column">
                  <Heading as="h2" fontSize="2xl" mb="2">
                    Subtotal (
                    {cartItems.reduce((acc, currVal) => acc + currVal.qty, 0)}{' '}
                    items)
                  </Heading>
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    color="blue.600"
                    mb="4"
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
                  >
                    Proceed to checkout
                  </Button>
                </Flex>
              </Flex>
            </Grid>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default CartScreen;
