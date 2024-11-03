import { Grid, Heading } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Heading
        as="h2"
        mb="8"
        fontSize={{ base: "xl", md: "2xl" }}
        p="1"
        textAlign="center"
      >
        Latest Products
      </Heading>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)", // 1fr 1fr on mobile
            sm: "repeat(2, 1fr)", // 1fr 1fr on small screens
            md: "repeat(3, 1fr)", // 3 columns on medium screens
            lg: "repeat(4, 1fr)", // 4 columns on large screens
          }}
          gap={{ base: "4", md: "8" }} // Adjust gaps for different screen sizes
          justifyContent="center"
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
