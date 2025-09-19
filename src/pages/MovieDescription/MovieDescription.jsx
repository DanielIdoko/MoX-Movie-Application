import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { lazy } from "react";
import { Suspense } from "react";
const MovieDetail = lazy(() => import("../../components/MovieDetail"));

// Help Generate random id's for movies to prevent colliding id's
import { v4 as uuid4 } from "uuid";
import { BaseApiUrl2, options } from "../../utils/API";
const SimilarMovies = lazy(() =>
  import("../../components/SimilarMovies/SimilarMovies")
);

const MovieDescription = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Get the state/data from the params function
  const { movie_id } = useParams();
  const location = useLocation();

  
  const getMovieDetails = async () => {
    try {
      const response = await fetch(
        `${BaseApiUrl2}/${movie_id}?language=en-US`,
        options
      );
      const data = await response.json();
      console.log(data);
      setMovieDetails(data)
    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    } finally {
      setErrorMessage(null);
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    getMovieDetails()
  }, [movie_id])

  return (
    <div className="w-full h-full md:mt-20 md:pl-6">
      {/* BreadCrumbs */}
      <span className="w-full h-fit py-6 px-3 md:px-6 flex items-center justify-start text-white">
        <Link to="/" className="breadcrumb-text">
          Movies
        </Link>
        {" / "}
        <Link to={`/movie/${movie_id}`} className="breadcrumb-text">
          {movieDetails?.original_title}
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
        ) : movieDetails ? (
          <>
            <MovieDetail movieDetails={movieDetails} key={uuid4()} />

            Similar movies section
            <h3 className="px-4 text-white md:text-medium mt-3">
              Similar Movies
            </h3>
            <Suspense fallback={<Spinner />}>
              <SimilarMovies movie={movieDetails} />
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
