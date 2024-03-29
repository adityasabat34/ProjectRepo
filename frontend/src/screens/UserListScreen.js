import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Td,
  Th,
  Tbody,
  Tr,
  Thead,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoPencilSharp,
  IoTrashBinSharp,
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, success]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure??')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Flex direction="column" alignItems="center" py={{ base: '5', md: '10' }}>
      <Heading as="h1" fontSize="3xl" mb="5">
        Users
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box
          w={{ base: '100%', md: '80%' }}
          bgColor="white"
          rounded="lg"
          shadow="lg"
          px="5"
          py="5"
          border="1px solid black"
        >
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>EMAIL</Th>
                <Th>ADMIN</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </Td>

                  <Td>
                    {user.isAdmin ? (
                      <Icon
                        as={IoCheckmarkCircleSharp}
                        color="green.700"
                        w="8"
                        h="8"
                      />
                    ) : (
                      <Icon
                        as={IoCloseCircleSharp}
                        color="red.600"
                        w="8"
                        h="8"
                      />
                    )}
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/user/${user._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="sm" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Flex>
  );
};

export default UserListScreen;
