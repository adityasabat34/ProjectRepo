import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Spacer,
  Grid,
  Heading,
  Input,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
  Icon,
  Th,
} from '@chakra-ui/react';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { listMyOrder } from '../actions/orderAction';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateUserProfile, getUserDetails } from '../actions/userAction';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { IoWarning } from 'react-icons/io5';
import { ORDER_DETAILS_RESET } from '../constants/orderConstants';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, orders, error: errorOrders } = orderMyList;

  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET });

    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
        dispatch(listMyOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [user, dispatch, navigate, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      dispatch({ type: USER_DETAILS_RESET });
    }
  };

  return (
    <Grid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} py="5" gap="10">
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            User Profile
          </Heading>

          {error && <Message type="error">{error}</Message>}
          {message && <Message type="error">{message}</Message>}

          <form onSubmit={submitHandler}>
            <FormControl id="name">
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="email">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="username@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="confirmPassword">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blackAlpha"
              bgColor="red.900"
              mt="4"
              isLoading={loading}
            >
              Update
            </Button>
          </form>
        </FormContainer>
      </Flex>

      <Flex direction="column">
        <Heading as="h2" mb="4">
          My Orders
        </Heading>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message type="error">{error}</Message>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{new Date(order.createdAt).toDateString()}</Td>
                  <Td>₹{order.totalPrice}</Td>
                  <Td>
                    {order.isPaid ? (
                      new Date(order.paidAt).toDateString
                    ) : (
                      <Icon as={IoWarning} color="red" />
                    )}
                  </Td>
                  <Td>
                    <Button
                      as={RouterLink}
                      to={`/order/${order._id}`}
                      colorScheme="teal"
                      size="sm"
                    >
                      Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Grid>
  );
};

export default ProfileScreen;
