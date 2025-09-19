import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useParams } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import MovieResult from "../components/MovieResult";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { searchImage } from "../assets";
const RecommendedSearches = lazy(() =>
  import("../components/RecommendedSearches")
);
const MovieCard = lazy(() => import("../components/MovieCard"));
import { options } from "../utils/API";

const SearchPage = () => {
  const { term } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchMovies = async (params) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      // console.log(data.results);
      setSearchResults(data.results);
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
    searchMovies();
  }, [term]);

  return (
    <div className="w-full p-3 h-full overflow-auto bg-dark">
      <div className="w-full h-fit flex items-center justify-start md:px-5 mt-4 md:py-5 md:mt-20 fixed top-0 left-0 md:left-4 z-50">
        <SearchInput />
      </div>
      {!term && (
        <Suspense fallback={<Spinner />}>
          <RecommendedSearches />
        </Suspense>
      )}
      {!term && (
        <div className="w-full h-dvh flex flex-col gap-4 items-center justify-center p-3">
          <img
            src={searchImage}
            alt="Search image"
            className="h-30 w-30 object-cover rounded-full"
          />
          <p className="text-medium text-gray-300">Search For Something</p>
        </div>
      )}
      <div className="mt-20 px-1 w-full h-full md:mt-40 ">
        {term && (
          <>
            <p className="text-md font-bold text-white p-1 md:pl-6">
              Search results for '{term}'
            </p>
            <p className="text-md font-bold text-gray-600 p-2 md:pl-6">
              {searchResults.length}
              {searchResults.length > 1 ? " movies" : " movie"} found
            </p>
          </>
        )}
        {term &&
          (searchResults.length > 0 ? (
            <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 content-center px-3 py-2 md:p-6 gap-6 mt-5">
              <Suspense>
                {searchResults.map((movieData) => (
                  <MovieCard
                    movieData={movieData}
                    movieState={movieData}
                    key={movieData.id}
                  />
                ))}
              </Suspense>
            </ul>
          ) : (
            <p className="text-white p-3 text-small">
              No results was found for that movie
            </p>
          ))}
      </div>
      {/* Footer here */}
      <Footer />
    </div>
  );
};

export default SearchPage;
