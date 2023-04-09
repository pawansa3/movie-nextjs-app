import { useEffect } from "react";
import { Inter } from "next/font/google";
import { Alert, AlertIcon, Box, Center } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  clearError,
  handleBookmark,
  handleWatched,
} from "@/store/reducers/movieReducer";
import Searchbar from "@/components/SearchBar";
import MovieDisplay from "@/components/MovieDisplay";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { lists: movies, error } = useSelector<RootState, any>(
    (state) => state.movie
  );

  useEffect(() => {
    setTimeout(() => dispatch(clearError()), 5000);

    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Stonks | Home</title>
      </Head>
      <Box p={5}>
        <Center h="15vh">
          <Searchbar />
        </Center>
        {error && (
          <Center h="15vh">
            <Alert status="error" w={{ base: "100%", md: "500px" }} maxW="100%">
              <AlertIcon />
              {error}
            </Alert>
          </Center>
        )}

        <MovieDisplay
          movies={movies}
          handleBookmark={(movie: any) => dispatch(handleBookmark(movie))}
          handleWatched={(movie: any) => dispatch(handleWatched(movie))}
        />
      </Box>
    </>
  );
}
