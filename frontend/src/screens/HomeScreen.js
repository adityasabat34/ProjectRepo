import { Grid, Heading } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <Heading as="h2" mb="8" fontSize="xl" p="1">
        Latest Products
      </Heading>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <Grid
          templateColumns="1fr 1fr 1fr 1fr"
          gap="8"
          // bgGradient="linear(to-r, gray.800, gray.400, gray.800)"
        >
          {products.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
