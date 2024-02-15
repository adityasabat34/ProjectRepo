import {
  Button,
  Flex,
  Spacer,
  RadioGroup,
  HStack,
  Heading,
  Radio,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { savePaymentMethod } from '../actions/cartAction';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutStep from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const paymentMethod = cart.paymentMethod || 'paypal';

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(paymentMethod);

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodRadio));
    navigate('/placeorder');
  };

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      py={{ base: '5', md: '10' }}
    >
      <FormContainer>
        <CheckoutStep step1 step2 step3 />

        <Heading as="h2" mb="8" fontSize={{ base: '2xl', md: '3xl' }}>
          Payment Method
        </Heading>

        <form onSubmit={submitHandler}>
          <FormControl as="fieldset">
            <FormLabel as="legend">Select Method</FormLabel>
            <RadioGroup
              value={paymentMethodRadio}
              onChange={setPaymentMethodRadio}
            >
              <HStack spacing={{ base: '12px', md: '24px' }}>
                <Radio value="paypal">Paypal or Credit/Debit Card</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Spacer h={{ base: '3', md: '6' }} />

          <Button
            type="submit"
            colorScheme="Alphablack"
            bgColor="red.900"
            mt="4"
            w="full"
          >
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default PaymentScreen;
