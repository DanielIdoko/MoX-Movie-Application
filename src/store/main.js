import { create } from "zustand";

const Main = create((set, get) => ({
  searchTerm: "",
  modalShown: false,
  searchBarVisible: true,
  savedMovies: [],
  movieSaved: false,

  handleSearch: (navigate) => {
    const { searchTerm } = get();
    if (!searchTerm.trim()) return;
    navigate(`/search/${encodeURIComponent(searchTerm)}`);
    set({ searchTerm: "" });
  },

  handleChange: (value) => {
    set({ searchTerm: value });
  },

  handleToggleModal: () => {
    const { modalShown } = get();
    set({ modalShown: !modalShown });
  },

  handleToggleSearchBar: () => {
    const { searchBarVisible } = get();
    set({ searchBarVisible: !searchBarVisible });
  },

  handleSaveMovie: (movie) => {
    const { savedMovies } = get();

    // Check if the movie is already saved. Using the unique 'id' for this.
    const isMovieAlreadySaved = savedMovies.some(
      (saved_movie) => saved_movie.id === movie.id
    );

    let updatedMovies;

    if (isMovieAlreadySaved) {
      // Do not proceed with updating the array if the movie has been saved.
      set({ modalShown: true, movieSaved: true });
      return;
    } else {
      // If the movie has not yet been saved, add it to the array.
      updatedMovies = [...savedMovies, movie];
    }

    // Update the state
    set({
      savedMovies: updatedMovies,
      movieSaved: true,
      modalShown: true,
    });

    // Save to local storage
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
  },

  getSavedMovies: () => {
    const storedMovies = localStorage.getItem("savedMovies");
    if (storedMovies) {
      set({ savedMovies: JSON.parse(storedMovies) });
    }
  },

  // Delete saved movie function
  handleDeleteMovie: (movieId) => {
    const { savedMovies } = get();
    const updatedMovies = savedMovies.filter((m) => m.id !== movieId);

    set({ savedMovies: updatedMovies });
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
  },
}));

export default Main;
