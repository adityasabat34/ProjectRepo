import { Flex } from '@chakra-ui/react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Flex
        as="main"
        mt="72px"
        direction="column"
        py="6"
        px="6"
        bgGradient="linear(to-r, gray.200, gray.400, white, gray.400, gray.200)"
      >
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
