import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import MovieCard from "../MovieCard";

const MovieDisplay = (props: any) => {
  const { movies, handleBookmark, handleWatched } = props;

  return (
    <Grid
      templateColumns="repeat(6, minmax(160px, 200px))"
      p={3}
      gap={4}
      justifyContent="space-between"
    >
      {movies.length > 0 &&
        movies.map((movie: any) => (
          <GridItem key={movie.imdbID} h="300px" w="100%">
            <MovieCard
              isBookmarked={movie.isBookmarked}
              isWatched={movie.isWatched}
              movie={movie}
              handleBookmark={() =>
                handleBookmark({ ...movie, isBookmarked: !movie.isBookmarked })
              }
              handleWatched={() =>
                handleWatched({ ...movie, isWatched: !movie.isWatched })
              }
            />
          </GridItem>
        ))}
    </Grid>
  );
};

export default MovieDisplay;
