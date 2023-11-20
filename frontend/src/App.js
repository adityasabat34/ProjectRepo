import { Flex } from '@chakra-ui/react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <div>
      <Header />
      <Flex
        as="main"
        mt="72px"
        direction="column"
        py="6"
        px="6"
        bgGradient="linear(to-r, gray.200, gray.400, white, gray.400, gray.200)"
      >
        <HomeScreen />
      </Flex>
      <Footer />
    </div>
  );
};

export default App;
