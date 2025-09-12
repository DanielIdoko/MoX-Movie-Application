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
    const { savedMovies, movieSaved, modalShown } = get();
    const findMovie = savedMovies.find((saved_movie) => saved_movie === movie);

    // Initialise empty savedmovies Arrray
    let updatedMovies;
    // If the movie is already in our storage, don't add it to the savedMovies array else update it
    if (findMovie) updatedMovies = [...(savedMovies || [])];
    else updatedMovies = [...(savedMovies || []), movie];

    // Save to store
    set({
      savedMovies: updatedMovies,
      movieSaved: !movieSaved,
      modalShown: !modalShown,
    });

    // Persist to localStorage
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
  },
  getSavedMovies: () => {
    const { savedMovies } = get();
    const storedMovies = localStorage.getItem("savedMovies");
    // Only update our savedMovies if we successfully got data from storedMovies
    if (storedMovies) set({ savedMovies: JSON.parse(storedMovies) });
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
