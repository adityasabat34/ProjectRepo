// ProductCarousel.js (the component file)
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Text, Image } from "@chakra-ui/react";

function ProductCarousel() {
  const images = [
    { src: "/images/carasoul.jpg", alt: "Fashion" },
    { src: "/images/carasoul1.jpg", alt: "Fashion" },
    { src: "/images/carasoul2.jpg", alt: "Fashion" },
    { src: "/images/carasoul3.jpg", alt: "Fashion" },
    { src: "/images/carasoul4.jpg", alt: "Fashion" },
    { src: "/images/carasoul5.jpg", alt: "Fashion" },
    { src: "/images/carasoul6.jpg", alt: "Fashion" },
    { src: "/images/carasoul7.jpg", alt: "Fashion" },
  ];

  return (
    <Box
      maxW={{ base: "full", md: "500px" }}
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={{ base: 2, md: 4 }}
    >
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        transitionTime={500}
        stopOnHover={true}
        showStatus={false}
      >
        {images.map((image, index) => (
          <Box key={index} position="relative">
            <Image
              src={image.src}
              alt={image.alt}
              objectFit="cover"
              width="100%"
              height={{ base: "200px", md: "400px" }}
            />
            <Text
              position="absolute"
              bottom="0"
              width="100%"
              bg="rgba(0, 0, 0, 0.5)"
              color="white"
              textAlign="center"
              p={2}
              fontSize={{ base: "sm", md: "md" }}
            >
              {image.alt}
            </Text>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default ProductCarousel;
