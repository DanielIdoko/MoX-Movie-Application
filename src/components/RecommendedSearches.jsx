import React, { useEffect } from "react";
import useFetchStore from "../store/useFetchMovies";
import { Link } from "react-router-dom";

const RecommendedSearches = () => {
  const { popularMovies, fetchPopularMovies } = useFetchStore();

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="w-full h-fit md:pl-6 mt-20 md:mt-40">
      <p className="text-small text-gray-300">
        Recommended Search
      </p>
      <ul className="w-full h-fit bg-gray-900/50 border-1 border-gray-800 p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 rounded-md mt-3">
        {popularMovies &&
          popularMovies.slice(0, 12).map((movie) => (
            <li className="text-small text-gray-500 cursor-pointer hover:text-gray-400 flex items-center justify-start gap-2 transition duration-200 ease-in">
              <Link to={`/movie/${movie.id}`}>{movie.originalTitle.length >= 10 ? movie.originalTitle.slice(0, 10) + "..." : movie.originalTitle}</Link>
              <span className="text-small">⭐{movie.averageRating}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecommendedSearches;
