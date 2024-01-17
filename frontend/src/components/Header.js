import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiOutlineMenuAlt3, HiShoppingBag, HiUser } from 'react-icons/hi';
import HeaderMenuItem from './HeaderMenuItem.js';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction.js';
import { IoChevronDown } from 'react-icons/io5';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Flex
      as="header"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      py="6"
      px="7"
      bgGradient="linear(to-r, gray.900,red.900,gray.500, gray.900)"
      w="100%"
      pos="fixed"
      top="0"
      left="0"
      zIndex="9999"
    >
      <Link as={RouterLink} to="/">
        <Heading
          as="h1"
          color="whiteAlpha.800"
          fontWeight="bold"
          size="md"
          letterSpacing="wide"
        >
          GenZ-Store
        </Heading>
      </Link>

      <Box
        display={{ base: 'block', md: 'none' }}
        onClick={() => setShow(!show)}
      >
        <Icon as={HiOutlineMenuAlt3} color="white" w="6" h="6" />
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        mt={{ base: '3', md: '0' }}
      >
        <HeaderMenuItem
          url="/cart"
          label="Cart"
          icon={<Icon as={HiShoppingBag} mr="1" w="4" h="4" />}
        />
        {userInfo ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<IoChevronDown />}
              _hover={{ textDecor: 'none', opacity: '0.7' }}
            >
              {userInfo.name}
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <HeaderMenuItem
            url="/login"
            label="Login"
            icon={<Icon as={HiUser} mr="1" w="4" h="4" />}
          />
        )}
      </Box>
    </Flex>
  );
};

export default Header;
