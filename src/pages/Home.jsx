import React, { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Help Generate random id's for movies to prevent colliding id's
import { v4 as uuid4 } from "uuid";
import { logo } from "../assets/index";
import { API_KEY, BaseApiUrl, BaseApiUrl2, ImageBaseUrl, options } from "../utils/API";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SearchInput from "../components/SearchInput";
import Main from "../store/main";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieCard = lazy(() => import("../components/MovieCard"));
// Movie genres list
const movieGenres = [
  { id: 28, name: "Action", color: "#e74c3c" },
  { id: 12, name: "Adventure", color: "#27ae60" },
  { id: 16, name: "Animation", color: "#f39c12" },
  { id: 35, name: "Comedy", color: "#f1c40f" },
  { id: 80, name: "Crime", color: "#34495e" },
  { id: 99, name: "Documentary", color: "#16a085" },
  { id: 18, name: "Drama", color: "#8e44ad" },
  { id: 10751, name: "Family", color: "#3498db" },
  { id: 14, name: "Fantasy", color: "#9b59b6" },
  { id: 36, name: "History", color: "#d35400" },
  { id: 27, name: "Horror", color: "#2c3e50" },
  { id: 10402, name: "Music", color: "#e67e22" },
  { id: 9648, name: "Mystery", color: "#7f8c8d" },
  { id: 10749, name: "Romance", color: "#e84393" },
  { id: 878, name: "Science Fiction", color: "#00cec9" },
  { id: 10770, name: "TV Movie", color: "#95a5a6" },
  { id: 53, name: "Thriller", color: "#2ecc71" },
  { id: 10752, name: "War", color: "#c0392b" },
  { id: 37, name: "Western", color: "#a0522d" },
];

export default function Home() {
  // Search bar state import
  const { searchBarVisible } = Main();

  // Main states
  const [selectedCategory, setSelectedCategory] = useState(28);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  

  // Fetch only popular movies
  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(
        `${BaseApiUrl}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        options
      );
      const data = await response.json();
      // console.log(data.results);
      setPopularMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setErrorMessage(null);
    }
  };

  // Fetch only Top rated movies
  const fetchTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `${BaseApiUrl2}/top_rated?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      // console.log(data.results);
      setTopRatedMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setErrorMessage(null);
    }
  };

  // Fetch only Upcoming movies
  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetch(
        `${BaseApiUrl2}/upcoming?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      // console.log(data.results);
      setUpcomingMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setErrorMessage(null);
    }
  };

  // Fetch movies by genres
  const fetchMoviesByCategory = async () => {
    try {
      const response = await fetch(
        `${BaseApiUrl}?with_genres=${selectedCategory}&sort_by=popularity.desc&language=en-US&page=1`,
        options
      );

      const data = await response.json();
      // console.log(data.results);
      setFilteredMovies(data.results);
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
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    fetchMoviesByCategory();
  }, [selectedCategory]);

  return (
    <div className="w-full h-full bg-dark text-white">
      <Link to="/"></Link>
      {/* This code below will show the search bar for the mobile view only if out searchBarvisible state is true */}
      {searchBarVisible && (
        <div className="w-full h-fit fixed top-0 left-0 md:hidden p-2 flex items-center justify-center z-20">
          <SearchInput />
        </div>
      )}

      {/* Hero section Starts */}
      <section className="hero-section">
        {errorMessage ? (
          <p className="text-center text-md text-base-color">
            An Error occured, please try again
          </p>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {popularMovies?.slice(0, 10).map((movie) => (
              <SwiperSlide key={uuid4()}>
                <Link
                  to={`/movie/${movie.id}`}
                  className="w-full h-full relative overflow-hidden bg-amber-50"
                >
                  <>
                    <img
                      src={ImageBaseUrl + movie.poster_path}
                      alt={movie.original_title + "Image"}
                      className="h-screen w-full object-cover"
                    />
                  </>
                  <div className="absolute w-full h-fit bottom-0 p-3 md:p-10 bg-dark/50">
                    <h1 className="text-large p-2">{movie.original_title}</h1>
                    <p className="text-white p-2">{movie.overview}</p>
                    {/* <Link to={`/movie/${movie.id}`} className='flex items-center gap-2 text-small text-gray-800 hover:text-gray-400 p-2 transition duration-500 ease-in underline'>View more details <FiArrowRight /></Link> */}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
      {/* Hero section Ends */}
      {/* Popular movies section */}
      <section className="w-full h-auto p-3 bg-transparent md:mt-2 md:p-8">
        <h2 className="sub-heading">📈Popular Movies</h2>

        <div className="w-full h-full">
          <Suspense fallback={<Spinner />}>
            {errorMessage ? (
              <p className="text-center text-md text-red-500">{errorMessage}</p>
            ) : isLoading ? (
              <Spinner />
            ) : (
              <Swiper
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={2}
                navigation
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
              >
                {popularMovies?.slice(0, 15).map((movie) => (
                  <>
                    <SwiperSlide key={uuid4()} className="w-fit h-full p-2">
                      <MovieCard movieData={movie} movieState={movie} />
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
            )}
          </Suspense>
        </div>
      </section>
      {/* Popular movies ection ends here */}

      {/* Top Rated section starts */}
      <section className="w-full h-auto p-3 bg-transparent md:mt-2 md:p-8">
        <h2 className="sub-heading">🚀Top Rated Movies</h2>

        <div className="w-full h-full">
          <Suspense fallback={<Spinner />}>
            {errorMessage ? (
              <p className="text-center text-md text-red-500">{errorMessage}</p>
            ) : isLoading ? (
              <Spinner />
            ) : (
              <Swiper
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={2}
                navigation
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
              >
                {topRatedMovies?.slice(0, 15).map((movie) => (
                  <>
                    <SwiperSlide key={uuid4()} className="w-fit h-full p-2">
                      <MovieCard movieData={movie} movieState={movie} />
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
            )}
          </Suspense>
        </div>
      </section>
      {/* Top Rated section ends */}

      {/* Upcoming section starts */}
      <section className="w-full h-auto p-3 bg-transparent md:mt-2 md:p-8">
        <h2 className="sub-heading">🔥Upcoming Movies</h2>

        <div className="w-full h-full">
          <Suspense fallback={<Spinner />}>
            {errorMessage ? (
              <p className="text-center text-md text-red-500">{errorMessage}</p>
            ) : isLoading ? (
              <Spinner />
            ) : (
              <Swiper
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={2}
                navigation
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
              >
                {upcomingMovies?.slice(0, 15).map((movie) => (
                  <>
                    <SwiperSlide key={uuid4()} className="w-fit h-full p-2">
                      <MovieCard movieData={movie} movieState={movie} />
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
            )}
          </Suspense>
        </div>
      </section>
      {/* Upcoming movies section ends */}

      {/* Categories section */}
      <section className="movies-categories">
        <h2 className="sub-heading">Explore different categories</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView="auto"
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
        >
          {movieGenres?.map((category) => (
            <SwiperSlide key={category.id} style={{ width: "auto" }}>
              <button
                className="category-button px-4 py-2 ml-3 rounded-md"
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  backgroundColor:
                    category.id === selectedCategory && category.color,
                }}
              >
                {category.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {errorMessage ? (
          <p className="text-center text-md text-red-500">{errorMessage}</p>
        ) : (
          <div className="w-full h-auto mt-6 md:p-2 grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-6 ">
            {filteredMovies?.map((movie) => (
              <Suspense fallback={<Spinner />} key={uuid4()}>
                <MovieCard movieData={movie} movieState={movie} />
              </Suspense>
            ))}
          </div>
        )}
      </section>

      {/* Footer section */}
      <Footer />
    </div>
  );
}
