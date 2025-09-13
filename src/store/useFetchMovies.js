import { create } from "zustand";
import axios from "axios";

const useFetchMovies = create((set, get) => ({
  error: null,
  isLoading: true,
  movies: [],
  popularMovies: [],
  filteredMovies: [],
  fetchMovies: async () => {
    const { error, isLoading } = get();
    try {
      set({ error: null, isLoading: false });
      fetch("/data/movies.json")
        .then((res) => res.json())
        .then((data) => set({ movies: data }))
        .catch((err) => set({ error: err, isLoading: false }));
    } catch (error) {
      set({ error: error, isLoading: false });
    } finally {
      set({ error: null, isLoading: false });
    }
  },
  fetchPopularMovies: async () => {
    const { error, isLoading } = get();

    try {
      set({ error: null, isLoading: false });
      fetch("/data/mostPopular.json")
        .then((res) => res.json())
        .then((data) => set({ popularMovies: data }))
        .catch((err) => set({ error: err, isLoading: false }));
    } catch (error) {
      set({ error: error, isLoading: false });
    } finally {
      set({ error: null, isLoading: false });
    }
  },
  filterMovies: async (category) => {
    const { error, isLoading } = get();

    set({ error: null, isLoading: false });
    fetch("/data/movies.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((Data) =>
          Data.genres.includes(category)
        );
        set({ filteredMovies: filteredData });
      })
      .catch((err) => set({ error: err, isLoading: false }));
  },
}));

export default useFetchMovies;
