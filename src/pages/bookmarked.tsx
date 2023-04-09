import MovieDisplay from "@/components/MovieDisplay";
import { AppDispatch, RootState } from "@/store";
import {
  handleBookmark,
  handleWatched,
  loadMovies,
} from "@/store/reducers/movieReducer";
import { MovieData } from "@/utils/interface";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Bookmarked = () => {
  const movies = useSelector<RootState, any>((state) =>
    state.movie.lists.filter((item: MovieData) => item.isBookmarked)
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadMovies());
  }, []);

  return (
    <>
      <Head>
        <title>Stonks | Bookmarked</title>
      </Head>
      <MovieDisplay
        movies={movies}
        handleBookmark={(movie: any) => dispatch(handleBookmark(movie))}
        handleWatched={(movie: any) => dispatch(handleWatched(movie))}
      />
    </>
  );
};

export default Bookmarked;
