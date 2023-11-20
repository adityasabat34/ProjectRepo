import { Link } from '@chakra-ui/react';

const HeaderMenuItem = ({ url, label, icon }) => {
  return (
    <Link
      href={url}
      fontSize="sm"
      letterSpacing="wide"
      textTransform="uppercase"
      mr="5"
      display="flex"
      alignItems="center"
      color="whiteAlpha.800"
      mb={{ base: '2', md: 0 }}
      _hover={{ textDecor: 'none', color: 'whiteAlpha.600' }}
    >
      {icon}
      {label}
    </Link>
  );
};

export default HeaderMenuItem;
