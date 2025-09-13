import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Fuse from "fuse.js";
import { useParams } from "react-router-dom";
import useFetchMovies from "../store/useFetchMovies";
import SearchInput from "../components/SearchInput";
import MovieResult from "../components/MovieResult";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { searchImage } from "../assets";
const RecommendedSearches = lazy(() =>
  import("../components/RecommendedSearches")
);

const SearchPage = () => {
  const { term } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const { movies, fetchMovies, isLoading } = useFetchMovies();

  // Fuse Js search options
  const searchOptions = {
    includeScore: true,
    keys: ["originalTitle", "genres", "description"],
  };

  // update searchResults function
  const updateSearchResults = useMemo(() => {
    // The search logic should run whenever the `term` or `movies` change.
    if (movies.length > 0 && term) {
      const fuse = new Fuse(movies, searchOptions);
      const results = fuse.search(term);

      setSearchResults(results);
    } else {
      // Clear results if the search term is empty or no movies are loaded
      setSearchResults([]);
    }
  }, [term, movies]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="w-full p-3 h-full overflow-auto bg-dark">
      <div className="w-full h-fit flex items-center justify-start md:px-5 md:py-5 md:mt-20 fixed top-0 left-0 md:left-4 z-50">
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
      <div className="mt-5 px-1 w-full h-full md:mt-40 ">
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
        {term && (
          <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-1 mt-5 md:pl-6">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <MovieResult
                  key={Math.random()}
                  result={result.item}
                  state={result}
                />
              ))
            ) : (
              <p className="text-white p-3 text-small">
                No results was found for that movie
              </p>
            )}
          </ul>
        )}
      </div>
      {/* Footer here */}
      <Footer />
    </div>
  );
};

export default SearchPage;
