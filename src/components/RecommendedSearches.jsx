import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseApiUrl, options } from "../utils/API";

const RecommendedSearches = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedSearches, setRecommendedSearches] = useState([]);

  // Fetch only popular movies
  const fetchRecommendedSearches = async () => {
    try {
      const response = await fetch(
        `${BaseApiUrl}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        options
      );
      const data = await response.json();
      // console.log(data.results);
      setRecommendedSearches(data.results);
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
    fetchRecommendedSearches();
  }, []);

  return (
    <div className="w-full h-fit md:pl-6 mt-20 md:mt-40">
      <p className="text-small text-gray-300">Search top movies</p>
      <ul className="w-full h-fit bg-gray-900/50 border-1 border-gray-800 p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 rounded-md mt-3">
        {recommendedSearches &&
          recommendedSearches.slice(0, 12).map((movie) => (
            <li
              className="text-small text-gray-500 cursor-pointer hover:text-gray-400 flex items-center justify-start gap-2 transition duration-200 ease-in"
              key={movie.id}
            >
              <Link to={`/movie/${movie.id}`}>
                {movie.original_title.length >= 10
                  ? movie.original_title.slice(0, 10) + "..."
                  : movie.original_title}
              </Link>
              <span className="text-small">⭐{movie.vote_average}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecommendedSearches;
