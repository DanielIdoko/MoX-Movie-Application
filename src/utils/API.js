const ImageBaseUrl = "https://image.tmdb.org/t/p/w500/";
const BaseApiUrl = "https://api.themoviedb.org/3/discover/movie";
const BaseApiUrl2 = "https://api.themoviedb.org/3/movie";
const API_KEY = import.meta.env.VITE_PUBLIC_TMDB_API_KEY;
// Movie data fetching options
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

export { ImageBaseUrl, API_KEY, BaseApiUrl, BaseApiUrl2, options};
