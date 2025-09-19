import React, { Suspense, useCallback } from "react";
import { useState } from "react";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import { FiArrowDown, FiArrowUp, FiHeart } from "react-icons/fi";
import { PosterImage } from "../assets";
import Main from "../store/main";
import ImageSkeleton from "./Skeleton/ImageSkeleton";
import { AiFillHeart } from "react-icons/ai";
import { ImageBaseUrl } from "../utils/API";

const MovieDetail = ({ movieDetails }) => {
  // This state will help us toggle for more details
  const [moreDetailsShown, setMoreDetailsShown] = useState(false);

  // Saved movies state gotten from Main store to track interaction with saved movies
  const { handleSaveMovie, handleToggleModal, modalShown } = Main();

  // Call handleSave movie function 
  const handleSave = useCallback(() => {
    handleSaveMovie(movieDetails);
    handleToggleModal();
  }, [modalShown]);

  let Image = (
    <img
      src={ImageBaseUrl + movieDetails.poster_path ? ImageBaseUrl + movieDetails.poster_path : PosterImage}
      className="w-screen h-[500px] md:w-full md:h-full lg:w-[500px] lg:h-[550px]"
      alt={movieDetails.original_title}
    />
  );

  return (
    <div className="w-full h-full p-2">
      <div className="w-full h-full block md:grid md:grid-cols-3 md:gap-5">
        {/* Image section */}
        <div className="w-fit h-fit overflow-hidden rounded-2xl shadow-xl">
          <Suspense fallback={<ImageSkeleton />}>{Image}</Suspense>
        </div>
        {/* Text section */}
        <div className="w-full h-full col-span-2 p-2">
          <span className="w-full h-fit flex flex-col justify-start md:items-start py-3 gap-2">
            <h3 className="text-x-medium md:text-large text-white flex-1">
              {movieDetails.original_title}
            </h3>
            {movieDetails.adult && (
              <p className="p-1 w-fit h-fit mt-1 rounded-sm bg-gray-800 text-x-small text-red-400">
                +18
              </p>
            )}
            <ul className="w-fit h-full p-0 flex items-center justify-start mt-2 gap-3 relative">
              {movieDetails.genres?.map((genre) => (
                <li
                  key={genre.id}
                  className="w-fit h-fit text-small text-gray-600 font-bold"
                >
                  {genre.name.toUpperCase()}
                </li>
              ))}
            </ul>
            {/* <p className="p-1 w-fit h-fit mt-1 rounded-sm bg-gray-800 text-x-small text-gray-500">
              {movieDetails.contentRating || "R"}
            </p> */}
          </span>
          <p className="text-gray-500 text-small pt-3 mt-1">
            {movieDetails.overview
              ? movieDetails.overview
              : "No description for this movie"}
          </p>
          <button
            className="text-gray-500 rounded-full my-6 p-2 flex items-center justify-center gap-2 text-small cursor-pointer hover:bg-gray-400/10 transition duration-200 ease-in"
            onClick={() => handleSave()}
          >
            <AiFillHeart />
            Add to watchList
          </button>
          <p className="text-gray-300 mt-15 text-small font-semibold">
            Production Companies
          </p>
          <Swiper
            // install Swiper modules
            spaceBetween={10}
            slidesPerView={2}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            <ul className="w-full h-fit flex items-center justify-safe-start gap-10 overflow-auto">
              {movieDetails.production_companies?.map((company) => (
                <SwiperSlide>
                  <li
                    className="text-gray-500 p-2 text-small flex justify-start items-center gap-2"
                    key={Math.random()}
                  >
                    <img
                      src={company.logo_path ? ImageBaseUrl + company.logo_path : PosterImage}
                      alt={company.logo_path}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    {company.name}
                  </li>
                </SwiperSlide>
              ))}
            </ul>
          </Swiper>

          {/* Numbers section */}
          <div className="w-full h-fit p-1 flex items-center justify-center md:justify-start gap-9 md:gap-17 mt-10">
            <div className="w-fit h-full flex flex-col justify-center items-center">
              <p className="text-x-medium text-gray-300">
                {movieDetails.vote_average ? (
                  movieDetails.vote_average.toFixed(1)
                ) : (
                  <span className="text-small">2.5 or above</span>
                )}
              </p>
              <span className="text-small text-gray-500">Rating</span>
            </div>
            <div className="w-fit h-full flex flex-col justify-center items-center">
              <p className="text-x-medium text-gray-300">
                $
                {movieDetails.budget ? movieDetails.budget.toLocaleString() : 0}
              </p>
              <span className="text-small text-gray-500 font-bold">Budget</span>
            </div>
            <div className="w-fit h-full flex flex-col justify-center items-center">
              <p className="text-x-medium text-gray-300">
                {movieDetails.release_date}
              </p>
              <span className="text-small text-gray-500">Release Date</span>
            </div>
          </div>

          <button
            onClick={() => setMoreDetailsShown(!moreDetailsShown)}
            className="text-gray-400 text-small mt-10 flex items-center justify-center gap-2 cursor-pointer hover:text-gray-500 transition duration-300 ease-in"
          >
            {moreDetailsShown ? "Show Less" : "Show More"}
            {moreDetailsShown ? <FiArrowUp /> : <FiArrowDown />}
          </button>

          {moreDetailsShown && (
            <div className="w-full h-fit p-0 mt-2">
              <p className="info">
                RunTime: <span>{movieDetails.runtime} minutes</span>
              </p>
              <p className="info">
                ReleaseDate: <span>{movieDetails.release_date}</span>
              </p>
              {/* <p className="info">
                Filming Locations:{" "}
                {movieDetails.filmingLocations?.map((location) => (
                  <span key={Math.random()}>{location}</span>
                ))}
              </p> */}
              {/* <p className="info">
                Interests:{" "}
                {movieDetails.interests?.map((interest) => (
                  <span key={Math.random()}>{interest}, </span>
                ))}
              </p> */}
              <p className="info">
                Votes:{" "}
                <span>{movieDetails.vote_count?.toLocaleString() || 0}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
