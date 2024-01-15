import { Flex, Text, Heading, Grid, Box, Link, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../actions/orderAction';
import { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, currVal) => acc + currVal.price * +currVal.qty,
      0
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <>
      <Flex w="full" py="5" direction="column">
        <Grid templateColumns="3fr 2fr" gap="20">
          {/**Column 1 */}
          <Flex direction="column" border="2px solid black" rounded="lg" p="5">
            {/**Shipping */}
            <Box borderBottom="1px" py="6" borderColor="gray.300">
              <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
                Shipping
              </Heading>
              <Text>
                Email:{' '}
                <strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </strong>
              </Text>
              <Text>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </Text>
              <Text mt="4">
                {order.isDelivered ? (
                  <Message type="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message type="warning">Not Delivered</Message>
                )}
              </Text>
            </Box>

            {/**Payment Method */}

            <Box borderBottom="1px" py="6" borderColor="gray.500">
              <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
                Payment Method
              </Heading>

              <Text>
                <strong>Method: </strong>
                {order.paymentMethod?.toUpperCase()}
              </Text>
              <Text mt="4">
                {order.isPaid ? (
                  <Message type="success">Paid</Message>
                ) : (
                  <Message type="warning">Not Paid</Message>
                )}
              </Text>
            </Box>

            {/**Order Items */}

            <Box borderBottom="1px" py="6" borderColor="gray.500">
              <Heading as="h2" fontSize="2xl" fontWeight="semibold">
                Order Itmes
              </Heading>
              <Box>
                {order.orderItems.length === 0 ? (
                  <Message>No Order Info</Message>
                ) : (
                  <Box py="2">
                    {order.orderItems.map((item, idx) => (
                      <Flex
                        key={idx}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Flex py="2" alignItems="center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            w="12"
                            h="12"
                            objectFit="cover"
                            mr="6"
                          />
                          <Link
                            fontWeight="bold"
                            fontSize="xl"
                            as={RouterLink}
                            to={`/products/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Flex>

                        <Text fontSize="lg" fontWeight="semibold">
                          {item.qty} x ₹{item.price} = ₹{+item.qty * item.price}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Flex>

          {/**column 2 */}

          <Flex
            direction="column"
            bgColor="gray.100"
            justifyContent="space-between"
            py="8"
            px="8"
            shadow="md"
            rounded="lg"
            borderColor="gray.500"
            border="2px solid black"
          >
            <Box>
              <Heading mb="6" as="h2" fontSize="3xl" fontWeight="bold">
                Order Summary
              </Heading>

              {/**Items price */}
              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.500"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Items</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.itemsPrice}
                </Text>
              </Flex>

              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.500"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Shipping</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.shippingPrice}
                </Text>
              </Flex>

              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.500"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Tax</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.taxPrice}
                </Text>
              </Flex>

              <Flex
                borderBottom="1px"
                py="2"
                borderColor="gray.500"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="xl">Total</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.totalPrice}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Grid>
      </Flex>
    </>
  );
};

export default OrderScreen;
