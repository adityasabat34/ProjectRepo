import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  FormControl,
  FormLabel,
  Box,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  createProductReview,
  listProductsDetails,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(listProductsDetails(id));
  }, [id, dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Flex mb="5">
        <Button
          as={RouterLink}
          to="/"
          colorScheme="gray"
          border="solid black 1px"
        >
          Go Back
        </Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Grid
            templateColumns={{ base: '1fr', md: '5fr 4fr 3fr' }} // Adjust column layout for mobile and above
            gap={{ base: '5', md: '10' }} // Adjust gap between columns for mobile and above
          >
            {/**column 1 */}
            <Image
              src={product.image}
              alt={product.name}
              borderRadius="md"
              border="solid black 1px"
              mx="auto" // Center image on mobile
              mb={{ base: '5', md: '0' }} // Adjust margin bottom for mobile and above
            />

            {/**column 2 */}

            <Flex direction="column">
              <Heading as="h5" fontSize="base" color="gray.500">
                {product.brand}
              </Heading>

              <Heading as="h2" fontSize="4xl" mb="5" color="red.900">
                {product.name}
              </Heading>

              <Rating
                value={product.rating}
                color="yellow.500"
                text={`${product.numReviews} reviews`}
                mb="5" // Adjust margin bottom for mobile and above
              />

              <Heading
                as="h5"
                fontSize="4xl"
                fontWeight="bold"
                color="teal.700"
                mb="5" // Adjust margin bottom for mobile and above
              >
                ₹{product.price}
              </Heading>

              <Text mb="5">{product.description}</Text>
            </Flex>

            {/**column 3 */}

            <Flex direction="column">
              <Flex justifyContent="space-between" py="2">
                <Text>Price:</Text>
                <Text fontWeight="bold">₹{product.price}</Text>
              </Flex>

              <Flex justifyContent="space-between" py="2" pb="10">
                <Text>Status:</Text>
                <Text fontWeight="bold">
                  {product.countInStock > 0 ? 'In Stock' : 'Not available'}
                </Text>
              </Flex>

              {product.countInStock > 0 && (
                <Flex justifyContent="space-between" py="2">
                  <Text>Qty:</Text>
                  <Select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    width="30%"
                  >
                    {[...Array(product.countInStock).keys()].map((i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </Select>
                </Flex>
              )}

              <Button
                bg="red.900"
                colorScheme="blackAlpha"
                my="2"
                textTransform="uppercase"
                letterSpacing="wide"
                isDisabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>
            </Flex>
          </Grid>

          {/* Review */}
          <Box
            p="10"
            bgColor="white"
            rounded="md"
            mt="10"
            borderColor="gray.300"
          >
            <Heading as="h3" size="lg" mb="6">
              Write a review
            </Heading>

            {product.reviews.length === 0 && <Message>No Reviews</Message>}

            {product.reviews.length !== 0 && (
              <Box p="4" bgColor="white" rounded="md" mb="1" mt="5">
                {product.reviews.map((review) => (
                  <Flex direction="column" key={review._id} mb="5">
                    <Flex justifyContent="space-between">
                      <Text fontSize="lg">
                        <strong>{review.name}</strong>
                      </Text>
                      <Rating value={review.rating} />
                    </Flex>
                    <Text mt="2">{review.comment}</Text>
                  </Flex>
                ))}
              </Box>
            )}

            {errorProductReview && (
              <Message type="error">{errorProductReview}</Message>
            )}

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <FormControl id="rating" mb="3">
                  <FormLabel>Rating</FormLabel>
                  <Select
                    placeholder="Select Option"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option>Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Okay</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Select>
                </FormControl>

                <FormControl id="comment" mb="3">
                  <FormLabel>Comment</FormLabel>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Textarea>
                </FormControl>

                <Button colorScheme="teal" type="submit">
                  Post Review
                </Button>
              </form>
            ) : (
              <Message>Please login to write a review</Message>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default ProductScreen;
