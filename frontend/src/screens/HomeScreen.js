import { Grid, Heading } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Heading as="h2" mb="8" fontSize="xl" p="1">
        Latest Products
      </Heading>

      <Grid
        templateColumns="1fr 1fr 1fr 1fr"
        gap="8"
        // bgGradient="linear(to-r, gray.800, gray.400, gray.800)"
      >
        {products.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </Grid>
    </>
  );
};

export default HomeScreen;
