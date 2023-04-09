import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "../actions/movieAction";
import { MovieData } from "@/utils/interface";

const initialState: any = {
  loading: false,
  error: null,
  lists: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadMovies: (state) => {
      let bookmarked: any = localStorage.getItem("bookmarked") || "[]";
      let watched: any = localStorage.getItem("watched") || "[]";
      bookmarked = JSON.parse(bookmarked);
      watched = JSON.parse(watched);
      const mergeData = bookmarked.concat(watched);

      const notBookmarked = mergeData.filter((item: any) => !item.isBookmarked);
      const notWatched = mergeData.filter((item: any) => !item.isWatched);
      const commonData = mergeData
        .filter((item: any) => item.isBookmarked && item.isWatched)
        .filter(
          (obj: any, index: number, self: any[]) =>
            index === self.findIndex((t) => t.imdbID === obj.imdbID)
        );

      state.lists = [...notBookmarked, ...notWatched, ...commonData];
    },
    handleBookmark: (state, actions) => {
      state.lists = state.lists.map((item: MovieData) => {
        if (item.imdbID === actions.payload.imdbID) {
          if (!actions.payload.isBookmarked)
            return {
              ...item,
              isWatched: actions.payload.isBookmarked,
              isBookmarked: actions.payload.isBookmarked,
            };
          return { ...item, isBookmarked: actions.payload.isBookmarked };
        }
        return item;
      });

      const bookmarked = state.lists.filter((item: any) => item.isBookmarked);
      const watched = state.lists.filter((item: any) => item.isWatched);
      localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    handleWatched: (state, actions) => {
      state.lists = state.lists.map((item: any) => {
        if (item.imdbID === actions.payload.imdbID) {
          return { ...item, isWatched: actions.payload.isWatched };
        }
        return item;
      });

      const bookmarked = state.lists.filter((item: any) => item.isBookmarked);
      const watched = state.lists.filter((item: any) => item.isWatched);
      localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, actions: any) => {
        state.loading = false;
        state.lists = actions.payload.data;
        state.error = actions.payload.error;
      })
      .addCase(fetchMovies.rejected, (state, actions: any) => {
        state.loading = false;
        state.error = actions.payload.error;
      });
  },
});

export const { loadMovies, handleBookmark, handleWatched, clearError } =
  movieSlice.actions;

export default movieSlice.reducer;
