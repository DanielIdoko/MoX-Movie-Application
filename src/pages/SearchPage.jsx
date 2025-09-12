import React, { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useParams } from "react-router-dom";
import useFetchMovies from "../store/useFetchMovies";
import SearchInput from "../components/SearchInput";
import MovieResult from "../components/MovieResult";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

const SearchPage = () => {
  const { term } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const { allMovies, movies, isLoading } = useFetchMovies();

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
  }, [term]);

  return (
    <div className="w-full p-3 h-full overflow-auto bg-dark">
      <SearchInput />
      <div className="mt-20 w-full h-full">
        <p className="text-md font-bold text-white p-1 md:pl-6">
          Search results for '{term}'
        </p>
        <p className="text-md font-bold text-gray-600 p-2 md:pl-6">{searchResults.length}{searchResults.length > 1 ? " movies" : " movie"} found</p>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5 pl-3 md:pl-6">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <MovieResult
                  key={Math.random()}
                  result={result.item}
                  state={result}
                />
              ))
            ) : (
              <p className="text-white p-3 text-small">No results was found for that movie</p>
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
