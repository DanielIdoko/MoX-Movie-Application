import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import MovieDetail from "../../components/MovieDetail";
import { lazy } from "react";
import { Suspense } from "react";
import useFetchMovies from "../../store/useFetchMovies";
import SearchInput from '../../components/SearchInput'

// Help Generate random id's for movies to prevent colliding id's
import { v4 as uuid4 } from "uuid";
import Main from "../../store/main";

const SimilarMovies = lazy(() =>
  import("../../components/SimilarMovies/SimilarMovies")
);

const MovieDescription = () => {
  // zustand states
  const {
    fetchAllMovies,
    filteredMovies,
    fetchMovies,
    allMovies,
    movies,
    isLoading,
    error: errorMessage,
  } = useFetchMovies();

  const { searchBarVisible } = Main();

  const [movieData, setMovieData] = useState(null);
  // Get the state/data from the params function
  const { movie_id } = useParams();
  const location = useLocation();

  // Get the movie data from our state or find from our API's Response data the movie id that matches that of our movie_id
  const movieDescriptionData = useMemo(() => {
    fetchAllMovies();
    fetchMovies();

    const movie =
      location.state?.movie ||
      movies.find((movie) => movie.id === movie_id) ||
      allMovies.find((movie) => movie.id === movie_id);
    filteredMovies.find((movie) => movie.id === movie_id);

    setMovieData(movie);
  }, [movie_id]);

  useEffect(() => {
    const newMovieData =
      movies.find((movie) => movie.id === movie_id) ||
      filteredMovies.find((movie) => movie.id === movie_id) ||
      allMovies.find((movie) => movie.id === movie_id);

    setMovieData(newMovieData);
  }, []);

  return (
    <div className="w-full h-full md:mt-20">
      {/* Search bar */}
      {searchBarVisible && (
        <div className="w-full h-fit fixed top-0 left-0 md:hidden p-2 flex items-center justify-center z-20">
          <SearchInput />
        </div>
      )}

      <div className={`pl-3 md:pl-10 ${
          searchBarVisible && "mt-13"
        }`}>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-600 text-small md:text-medium">
            {errorMessage}
          </p>
        ) : movieData ? (
          <>
            <MovieDetail movieData={movieData} key={uuid4()} />

            {/* Similar movies section */}
            <h3 className="p-3 text-white md:text-medium mt-3">
              Similar Movies
            </h3>
            <Suspense fallback={<Spinner />}>
              <SimilarMovies movie={movieData} />
            </Suspense>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default MovieDescription;
