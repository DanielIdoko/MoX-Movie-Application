import React, { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import useFetchMovies from "../store/useFetchMovies";
// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Help Generate random id's for movies to prevent colliding id's
import { v4 as uuid4 } from "uuid";
import { logo } from "../assets/index";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SearchInput from "../components/SearchInput";
import Main from "../store/main";
import { Link } from "react-router-dom";

const MovieCard = lazy(() => import("../components/MovieCard"));
const categories = ["Action", "Drama", "Comedy", "Animation"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Action");
  const {
    fetchMovies,
    filterMovies,
    filteredMovies,
    movies,
    isLoading,
    error: errorMessage,
  } = useFetchMovies();

  // FetchMoviesData function is independent on itself/no dependencies
  useEffect(() => {
    fetchMovies();
  }, []);

  // Call filterMovies(depends on a selected category) and fetchMovies(Runs on every load of the app) function
  useEffect(() => {
    filterMovies(selectedCategory);
  }, [selectedCategory]);

  // Search bar state import
  const { searchBarVisible } = Main();

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
            {movies.slice(0, 10).map((movie) => (
              <SwiperSlide key={uuid4()}>
                <Link
                  to={`/movie/${movie.id}`}
                  className="w-full h-full relative overflow-hidden bg-amber-50"
                >
                  <div>
                    <img
                      src={movie.primaryImage}
                      alt={movie.originalTitle + "Image"}
                      className="h-screen w-full object-cover"
                    />
                  </div>
                  <div className="absolute w-full h-fit bottom-0 p-3 md:p-10 bg-dark/50">
                    <h1 className="text-large p-2">{movie.originalTitle}</h1>
                    <p className="text-gray-200 p-2">{movie.description}</p>
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
      <section className="w-full h-auto p-3 bg-transparent md:mt-26 md:p-8">
        <h2 className="sub-heading">Most Popular Movies For You</h2>
        <div className="w-full h-full flex-items-center justify-start p-3 md:p-6">
          <Suspense fallback={<Spinner />}>
            {errorMessage ? (
              <p className="text-center text-md text-base-color">
                An Error occured, please try again
              </p>
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
                {movies.slice(0, 20).map((movie) => (
                  <>
                    <SwiperSlide key={uuid4()}>
                      <MovieCard
                        movieData={movie}
                        loading={"lazy"}
                        movieState={movie}
                      />
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
            )}
          </Suspense>
        </div>
      </section>
      {/* Popular movies ection ends here */}
      {/* Categories section */}
      <section className="movies-categories">
        <h2 className="sub-heading">Filter by Category</h2>
        <nav className="w-full h-auto flex items-center justify-start gap-1 md:gap-6 md:pl-3">
          {categories.map((category) => (
            <button
              className="category-button"
              key={uuid4()}
              onClick={() => setSelectedCategory(category)}
              style={{
                backgroundColor:
                  category == selectedCategory ? "rgba(255,255,255,.08)" : "",
              }}
            >
              {category}
            </button>
          ))}
        </nav>
        {errorMessage ? (
          <p className="text-center text-md text-white">
            An Error occured, please try again
          </p>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <div className="w-full h-auto mt-6 grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-6 items-center justify-items-center">
            {filteredMovies.slice(0, 30).map((movie) => (
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
