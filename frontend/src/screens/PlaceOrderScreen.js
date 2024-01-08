import {
  Grid,
  Heading,
  Flex,
  Button,
  Text,
  Image,
  Link,
  Box,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { createOrder } from '../actions/orderAction';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  return <div></div>;
};

export default PlaceOrderScreen;
