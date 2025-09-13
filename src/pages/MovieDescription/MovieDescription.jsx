import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { lazy } from "react";
import { Suspense } from "react";
import useFetchMovies from "../../store/useFetchMovies";
import SearchInput from "../../components/SearchInput";
const MovieDetail = lazy(() => import("../../components/MovieDetail"));

// Help Generate random id's for movies to prevent colliding id's
import { v4 as uuid4 } from "uuid";
import Main from "../../store/main";

const SimilarMovies = lazy(() =>
  import("../../components/SimilarMovies/SimilarMovies")
);

const MovieDescription = () => {
  // zustand states
  const {
    fetchPopularMovies,
    filteredMovies,
    fetchMovies,
    popularMovies,
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
    // fetchpopularMovies();
    // fetchMovies();

    const movie =
      location.state?.movie ||
      movies.find((movie) => movie.id === movie_id) ||
      popularMovies.find((movie) => movie.id === movie_id) ||
      filteredMovies.find((movie) => movie.id === movie_id);

    if (movie) {
      setMovieData(movie);
      // console.log(movieData);
    } else {
      const newMovieData =
        movies.find((movie) => movie.id === movie_id) ||
        filteredMovies.find((movie) => movie.id === movie_id) ||
        popularMovies.find((movie) => movie.id === movie_id);

      setMovieData(newMovieData);
    }
  }, [movie_id, location.state]);

  // useEffect(() => {

  // }, []);

  return (
    <div className="w-full h-full md:mt-20 md:pl-6">
      {/* BreadCrumbs */}
        <span className="w-full h-fit py-6 px-3 md:px-6 flex items-center justify-start text-white">
        <Link to="/" className="breadcrumb-text">
          Movies
        </Link>
        {" / "}
        <Link to={`/movie/${movie_id}`} className="breadcrumb-text">
          {movieData?.originalTitle}
        </Link>
      </span>
      {/* Breadcrumbs ends */}

      <>
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
            <h3 className="px-4 text-white md:text-medium mt-3">
              Similar Movies
            </h3>
            <Suspense fallback={<Spinner />}>
              <SimilarMovies movie={movieData} />
            </Suspense>
          </>
        ) : (
          <Spinner />
        )}
      </>
    </div>
  );
};

export default MovieDescription;
