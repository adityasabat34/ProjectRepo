import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { getUserPersonalId, updateUser } from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userPersonalId = useSelector((state) => state.userPersonalId);
  const { loading, error, user } = userPersonalId;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate(`/admin/userlist`);
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserPersonalId(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <Flex direction="column" alignItems="center" py={{ base: '5', md: '10' }}>
      <Flex mb="5">
        <Button
          as={RouterLink}
          to="/admin/userlist"
          colorScheme="gray"
          border="solid black 1px"
        >
          Go Back
        </Button>
      </Flex>
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl" textAlign="center">
          Edit User
        </Heading>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message type="error">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            <FormControl id="isAdmin" isRequired={false}>
              <FormLabel>Is Admin?</FormLabel>
              <Checkbox
                size="lg"
                colorScheme="teal"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              >
                Is Admin?
              </Checkbox>
            </FormControl>
            <Spacer h="3" />

            <Button
              type="submit"
              isLoading={loading}
              colorScheme="teal"
              mt="4"
              w="full"
            >
              Update
            </Button>
          </form>
        )}
      </FormContainer>
    </Flex>
  );
};

export default UserEditScreen;
