import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";
import Main from "../../store/main";
const SavedMovie = lazy(() => import("../../components/Saved/SavedMovie"));
const Spinner = lazy(() => import("../../components/Spinner"));
import { v4 as uuid } from "uuid";

const SavedPage = () => {
  const { savedMovies, getSavedMovies } = Main();

  useEffect(() => {
    getSavedMovies();
  }, []);

  // Track which movie’s modal is open (by ID)
  const [activeModalMovieId, setActiveModalMovieId] = useState(null);

  const handleToggleConfirmModal = useCallback((movieId = null) => {
    setActiveModalMovieId(movieId);
  }, []);

  return (
    <div className="bg-dark w-full h-full p-3 md:p-13 md:mt-20">
      <h3 className="text-white text-medium p-3 md:pl-1">
        Your Saved Movies
      </h3>

      <ul className="w-full p-1 h-full gap-1.5">
        <Suspense fallback={<Spinner />}>
          {savedMovies && savedMovies.length > 0 ? (
            [...savedMovies].reverse().map((movie) => (
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
            <p className="text-gray-400">No Movies Saved Yet</p>
          )}
        </Suspense>
      </ul>
    </div>
  );
};

export default SavedPage;
