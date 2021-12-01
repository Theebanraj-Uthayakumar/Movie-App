import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  `movies/fetchAsyncMovies`,
  async () => {
    const movieText = "Iron Man";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  `movies/fetchAsyncShows`,
  async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowsDetails = createAsyncThunk(
  `movies/fetchAsyncMovieOrShowsDetails`,
  async (id) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  seletedMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSeletedMovieOrShow: (state) => {
      state.seletedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pendeing");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Sucessfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected!");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Sucessfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowsDetails.fulfilled]: (state, { payload }) => {
      console.log("Fetched Sucessfully");
      return { ...state, seletedMovieOrShow: payload };
    },
  },
});

export const { removeSeletedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSeletedMovieOrShows = (state) =>
  state.movies.seletedMovieOrShow;
export default movieSlice.reducer;
