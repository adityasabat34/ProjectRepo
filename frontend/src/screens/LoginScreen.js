import {
  Flex,
  Button,
  Heading,
  FormLabel,
  FormControl,
  Input,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  useNavigate,
  useSearchParams,
  Link as RouterLink,
} from 'react-router-dom';
import { login } from '../actions/userAction';
import Message from '../components/Message';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <FormContainer>
        <Heading as="h1" mb="8" fontSize={{ base: '3xl', md: '4xl' }}>
          Login
        </Heading>

        {error && <Message type="error">{error}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="email" mb="4">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="username@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" mb="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="*************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blackAlpha"
            bgColor="red.900"
            isLoading={loading}
            w="100%"
          >
            Login
          </Button>
        </form>

        <Spacer height="4" />

        <Text fontWeight="semibold" mt="4">
          New Customer?{' '}
          <Link as={RouterLink} to="/register" color="blue.500">
            Click here to register
          </Link>
        </Text>
      </FormContainer>
    </Flex>
  );
};

export default LoginScreen;
