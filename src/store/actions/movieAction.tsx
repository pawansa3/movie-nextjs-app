import { MovieData } from "@/utils/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (searchTerm: string) => {
    try {
      const response = await axios.get(`/api/${searchTerm}`);
      if (response.data.length === 0) {
        return {
          data: [],
          error: `Can't find any movie with the name ${searchTerm}.`,
        };
      }

      let bookmarked: any = localStorage.getItem("bookmarked") || "[]";
      let watched: any = localStorage.getItem("watched") || "[]";
      bookmarked = JSON.parse(bookmarked);
      watched = JSON.parse(watched);

      const data: MovieData[] = response.data.map((item: MovieData) => ({
        ...item,
        isBookmarked: bookmarked.some(
          (b: MovieData) => b.imdbID === item.imdbID
        ),
        isWatched: watched.some((w: MovieData) => w.imdbID === item.imdbID),
      }));
      return {
        data: data,
        error: null,
      };
    } catch (err: any) {
      return {
        data: [],
        error: err.message,
      };
    }
  }
);
