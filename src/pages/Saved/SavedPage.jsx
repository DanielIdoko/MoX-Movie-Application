import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";
import Main from "../../store/main";
const SavedMovie = lazy(() => import("../../components/Saved/SavedMovie"));
const Spinner = lazy(() => import("../../components/Spinner"));
import { v4 as uuid } from "uuid";
import Footer from "../../components/Footer";
import { FiTrash } from "react-icons/fi";

const SavedPage = () => {
  const { savedMovies, getSavedMovies, handleDeleteAllSavedMovie } = Main();

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
      <div className="w-full h-fit py-2 flex items-center justify-start">
        <h3 className="text-white text-medium p-3 flex-1">Your Saved Movies</h3>
        <button className="bg-red-600/5 flex text-small items-center gap-2 justify-center p-2 rounded-md text-red-500 cursor-pointer hover:bg-red-600/10 transition duration-300 ease-in"
        onClick={() => handleDeleteAllSavedMovie()}>
          <FiTrash /> Clear All
        </button>
      </div>
      {/* Saved movies */}
      <ul className="w-full p-1 gap-1.5 h-dvh">
        <Suspense fallback={<Spinner />}>
          {savedMovies?.length > 0 ? (
            [...savedMovies]
              .reverse()
              .map((savedmovie) => (
                <SavedMovie
                  key={uuid()}
                  movie={savedmovie}
                  confirmModalShown={activeModalMovieId === savedmovie.id}
                  handleToggleConfirmModal={() =>
                    handleToggleConfirmModal(
                      activeModalMovieId === savedmovie.id
                        ? null
                        : savedmovie.id
                    )
                  }
                />
              ))
          ) : (
            <div className="w-full h-full flex items-center justify-center p-30">
              <p className="text-gray-400 text-small">
                No Movies Saved here Yet
              </p>
            </div>
          )}
        </Suspense>
      </ul>
      {/* Footer here */}
      <Footer />
    </div>
  );
};

export default SavedPage;
