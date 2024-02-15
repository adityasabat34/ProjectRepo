import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Image,
  Grid,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderAction';
import { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, currVal) => acc + currVal.price * +currVal.qty,
      0
    );
  }

  useEffect(() => {
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });

    if (!order.orderItems.length > 0 || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => dispatch(deliverOrder(order));

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <>
      <Flex direction="column" alignItems="center" py="5">
        <Heading as="h1" fontSize="3xl" mb="5">
          Order Details
        </Heading>
        <Grid
          templateColumns={{ base: '1fr', md: '3fr 2fr' }}
          gap={{ base: '6', md: '20' }}
          width="100%"
          maxW="1200px"
        >
          {/**Column 1 */}
          <Box>
            {/**Shipping */}
            <Box borderBottom="1px" py="6">
              <Heading as="h2" mb="3" fontSize="xl" fontWeight="semibold">
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

            <Box borderBottom="1px" py="6">
              <Heading as="h2" mb="3" fontSize="xl" fontWeight="semibold">
                Payment Method
              </Heading>

              <Text>
                <strong>Method: </strong>
                {order.paymentMethod?.toUpperCase()}
              </Text>
              <Text mt="4">
                {order.isPaid ? (
                  <Message type="success">
                    Paid on {new Date(order.paidAt).toUTCString()}
                  </Message>
                ) : (
                  <Message type="warning">Not Paid</Message>
                )}
              </Text>
            </Box>

            {/**Order Items */}

            <Box borderBottom="1px" py="6">
              <Heading as="h2" fontSize="xl" fontWeight="semibold">
                Order Items
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
          </Box>

          {/**Column 2 */}
          <Flex direction="column" maxW="400px">
            <Box>
              <Heading mb="6" fontSize="xl" fontWeight="bold">
                Order Summary
              </Heading>

              {/**Items price */}
              <Box borderBottom="1px" py="2">
                <Text fontSize="xl">Items</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.itemsPrice}
                </Text>
              </Box>

              <Box borderBottom="1px" py="2">
                <Text fontSize="xl">Shipping</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.shippingPrice}
                </Text>
              </Box>

              <Box borderBottom="1px" py="2">
                <Text fontSize="xl">Tax</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.taxPrice}
                </Text>
              </Box>

              <Box borderBottom="1px" py="2">
                <Text fontSize="xl">Total</Text>
                <Text fontWeight="bold" fontSize="xl">
                  ₹{order.totalPrice}
                </Text>
              </Box>
            </Box>

            {/**Payment button */}
            {!order.isPaid && (
              <Box mt="4">
                {loadingPay ? (
                  <Loader />
                ) : (
                  <PayPalScriptProvider
                    options={{
                      clientId:
                        'AT342rR9oy9T1txil2ZSsIRN6qtSDjNjVmaTfpbDLCrCBNCdCs1nsFdnt-Yk50lyG7so1K-BRubTh492',
                      components: 'buttons',
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.totalPrice,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          console.log(details);
                          const paymentResult = {
                            id: details.id,
                            status: details.status,
                            update_time: details.update_time,
                            email_address: details.payer.email_address,
                          };
                          successPaymentHandler(paymentResult);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </Box>
            )}

            {/* Order Deliver Button */}
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <Button
                  type="button"
                  colorScheme="teal"
                  onClick={deliverHandler}
                  mt="4"
                >
                  Mark as delivered
                </Button>
              )}
          </Flex>
        </Grid>
      </Flex>
    </>
  );
};

export default OrderScreen;
