import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import MovieCard from "../MovieCard";
// Help Generate random id's for movies to prevent colliding id's
import { v4 as uuid4 } from "uuid";
import { BaseApiUrl2, options } from "../../utils/API";

const SimilarMovies = ({ movie }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSimilarMovies = async () => {
    try {
      const response = await fetch(
        `${BaseApiUrl2}/${movie.id}/similar?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      // console.log(data.results);
      setSimilarMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    getSimilarMovies();
  }, [movie.id]);
  
  return (
    <ul className="w-full h-auto mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-items-center md:justify-items-start md:px-3">
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-600 text-small">{errorMessage}</p>
      ) : similarMovies?.length > 0 ? (
        similarMovies
          .slice(0, 5)
          .map((similarMovie) => (
            <MovieCard
              movieData={similarMovie}
              key={uuid4()}
              state={similarMovie}
            />
          ))
      ) : (
        <p className="text-gray-500 text-small">No similar movies found.</p>
      )}
    </ul>
  );
};

export default SimilarMovies;
