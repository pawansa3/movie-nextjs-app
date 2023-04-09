import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Flex,
  Text,
  Box,
  Spacer,
  Badge,
  Divider,
} from "@chakra-ui/react";

import { FaStar, FaEye, FaRegStar, FaEyeSlash } from "react-icons/fa";

const MovieCard = (props: any) => {
  const { movie, handleBookmark, handleWatched, isBookmarked, isWatched } =
    props;

  return (
    <Card>
      <Image
        objectFit="cover"
        h="200px"
        // w="200px"
        src={movie.Poster}
        alt={movie.Title}
      />

      <CardBody p={2}>
        <Text>
          {movie.Title.length > 16
            ? movie.Title.slice(0, 16) + "..."
            : movie.Title}
        </Text>
        <Flex>
          <Badge variant="outline" colorScheme="green">
            {movie.Year}
          </Badge>
          <Spacer />
          <Badge variant="outline" colorScheme="green">
            {movie.Type}
          </Badge>
        </Flex>
      </CardBody>
      <Divider />

      <CardFooter flexWrap="wrap" p={0}>
        <Button flex="1" variant="ghost" onClick={() => handleBookmark()}>
          {isBookmarked ? <FaStar /> : <FaRegStar />}
        </Button>
        {isBookmarked ? (
          <Button flex="1" variant="ghost" onClick={() => handleWatched()}>
            {isWatched ? <FaEye /> : <FaEyeSlash />}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
