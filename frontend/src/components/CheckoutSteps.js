import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react';
import { IoCaretForwardSharp } from 'react-icons/io5';
import { Link as RouterLink } from 'react-router-dom';

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Flex justifyContent="center" mb="8">
      <Breadcrumb separator={<IoCaretForwardSharp color="gray.500" />}>
        {/**step 1 */}
        <BreadcrumbItem>
          {step1 ? (
            <BreadcrumbLink to="/login?redirect=/shipping" as={RouterLink}>
              Login
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.400">
              Login
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/**step 2 */}
        <BreadcrumbItem>
          {step2 ? (
            <BreadcrumbLink to="/shipping" as={RouterLink}>
              shipping
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.400">
              Shipping
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/**step 3*/}
        <BreadcrumbItem>
          {step3 ? (
            <BreadcrumbLink to="/payment" as={RouterLink}>
              Payment
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.500">
              Payment
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/**step 4 */}
        <BreadcrumbItem>
          {step4 ? (
            <BreadcrumbLink to="/placeholder" as={RouterLink}>
              Place Order
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.500">
              Place Order
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};

export default CheckoutStep;
