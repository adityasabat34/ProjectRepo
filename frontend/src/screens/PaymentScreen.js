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
  const { paymentMethod, shippingAddress } = cart;

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(
    paymentMethod || 'paypal'
  );

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
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <CheckoutStep step1 step2 step3 />

        <Heading as="h2" mb="8" fontSize="3xl">
          Payment Method
        </Heading>

        <form onSubmit={submitHandler}>
          <FormControl as="fieldset">
            <FormLabel as="legend">Select Method</FormLabel>
            <RadioGroup
              value={paymentMethodRadio}
              onChange={setPaymentMethodRadio}
            >
              <HStack space="24px">
                <Radio value="paypal">Paypal or Credit/Debit Card</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Spacer h="3" />

          <Button
            type="submit"
            colorScheme="Alphablack"
            bgColor="red.900"
            mt="4"
          >
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default PaymentScreen;
