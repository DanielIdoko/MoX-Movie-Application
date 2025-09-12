import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import MovieDetail from "../../components/MovieDetail";
import { lazy } from "react";
import { Suspense } from "react";
import useFetchMovies from "../../store/useFetchMovies";

// Help Generate random id's for movies to prevent colliding id's
import { v4 as uuid4 } from "uuid";

const SimilarMovies = lazy(() =>
  import("../../components/SimilarMovies/SimilarMovies")
);

const MovieDescription = () => {
  const {
    fetchAllMovies,
    filteredMovies,
    fetchMovies,
    allMovies,
    movies,
    isLoading,
    error: errorMessage,
  } = useFetchMovies();

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
    <div className="w-full h-full md:mt-20 p-3 md:p-10">
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-600 text-small md:text-medium">{errorMessage}</p>
      ) : movieData ? (
        <>
          <MovieDetail movieData={movieData} key={uuid4()} />

          {/* Similar movies section */}
          <h3 className="p-3 text-white md:text-medium mt-3">Similar Movies</h3>
          <Suspense fallback={<Spinner />}>
            <SimilarMovies movie={movieData} />
          </Suspense>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MovieDescription;
