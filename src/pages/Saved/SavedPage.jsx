import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";
import Main from "../../store/main";
const SavedMovie = lazy(() => import("../../components/Saved/SavedMovie"));
const Spinner = lazy(() => import("../../components/Spinner"));
import { v4 as uuid } from "uuid";
import SearchInput from "../../components/SearchInput";
import Footer from "../../components/Footer";

const SavedPage = () => {
  const { savedMovies, getSavedMovies, searchBarVisible } = Main();

  useEffect(() => {
    // console.log(savedMovies);
    getSavedMovies();
  }, []);

  // Track which movie’s modal is open (by ID)
  const [activeModalMovieId, setActiveModalMovieId] = useState(null);

  const handleToggleConfirmModal = useCallback((movieId = null) => {
    setActiveModalMovieId(movieId);
  }, []);

  return (
    <div className="bg-dark w-full p-3 h-full md:p-13 md:mt-20">
      {/* Search bar */}
      {searchBarVisible && (
        <div className="w-full h-fit fixed top-0 left-0 md:hidden p-2 flex items-center justify-center z-20">
          <SearchInput />
        </div>
      )}

      <h3
        className={`text-white text-medium p-3 ${
          searchBarVisible && "mt-13"
        } md:pl-1`}
      >
        Your Saved Movies
      </h3>

      {/* Saved movies */}
      <ul className="w-full p-1 gap-1.5">
        <Suspense fallback={<Spinner />}>
          {savedMovies && savedMovies.length > 0 ? (
            [...savedMovies]
              .reverse()
              .map((movie) => (
                <SavedMovie
                  key={uuid()}
                  movie={movie}
                  confirmModalShown={activeModalMovieId === movie.id}
                  handleToggleConfirmModal={() =>
                    handleToggleConfirmModal(
                      activeModalMovieId === movie.id ? null : movie.id
                    )
                  }
                />
              ))
          ) : (
            <div className="w-full h-full flex items-center justify-center p-30">
              <p className="text-gray-400 text-small">No Movies Saved Yet</p>
            </div>
          )}
        </Suspense>
      </ul>

      <Footer />
    </div>
  );
};

export default SavedPage;
