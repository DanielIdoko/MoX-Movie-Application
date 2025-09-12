import React from "react";
import { useState } from "react";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import { FiArrowDown, FiArrowUp, FiHeart } from "react-icons/fi";
import { PosterImage } from "../assets";
import Main from '../store/main'


const MovieDetail = ({ movieData }) => {
  // This state will help us toggle for more details
  const [moreDetailsShown, setMoreDetailsShown] = useState(false);
  // const { handleSaveMovie } = Main();

  return (
    <div className="w-full h-full p-2">
      <div className="w-full h-full block md:grid md:grid-cols-3 md:gap-10">
        {/* Image section */}
        <div className="w-fit h-fit overflow-hidden rounded-2xl shadow-xl">
          <img
            src={
              decodeURIComponent(movieData.primaryImage).length > 10
                ? movieData.primaryImage
                : PosterImage
            }
            alt={movieData.originalTitle}
          />
        </div>
        {/* Text section */}
        <div className="w-full h-full col-span-2 p-2">
          <ul className="w-full h-fit p-0 flex items-center justify-start mt-6 gap-3 relative">
            {movieData.genres.map((genre) => (
              <li
                key={genre + "id"}
                className="w-fit h-fit text-small text-gray-600"
              >
                {genre.toUpperCase()}
              </li>
            ))}
{/* 
            <button
                className="text-gray-500 p-1 text-medium flex items-center justify-center absolute right-0 transition duration-200 ease-in rounded-full cursor-pointer hover:bg-gray-400/10 hover:text-white"
              onClick={() => handleSaveMovie()}
            >
              <FiHeart />
            </button> */}
            
          </ul>
          <span className="w-full h-fit flex items-center justify-start mt-6 gap-2">
            <h3 className="text-x-medium md:text-large text-white flex-1">
              {movieData.originalTitle}
            </h3>
            {movieData.isAdult && (
              <p className="p-1 w-fit h-fit mt-1 rounded-sm bg-gray-800 text-x-small text-red-400">
                +18
              </p>
            )}
            <p className="p-1 w-fit h-fit mt-1 rounded-sm bg-gray-800 text-x-small text-gray-500">
              {movieData.contentRating || "R"}
            </p>
          </span>
          <p className="text-gray-400 text-small pt-3">
            {movieData.description
              ? movieData.description
              : "No description for this movie"}
          </p>

          <p className="text-gray-300 pt-15 text-small">Production Companies</p>
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
            <ul className="w-full h-fit flex items-center justify-safe-start gap-3 overflow-auto">
              {movieData.productionCompanies.map((company) => (
                <SwiperSlide>
                  <li
                    className="text-gray-500 p-2 text-small"
                    key={Math.random()}
                  >
                    -{company.name}
                  </li>
                </SwiperSlide>
              ))}
            </ul>
          </Swiper>

          {/* Numbers section */}
          <div className="w-full h-fit p-1 flex items-center justify-start gap-10 mt-6">
            <div className="w-fit h-full flex flex-col justify-center items-center">
              <p className="text-x-medium text-gray-300">
                {movieData.averageRating}
              </p>
              <span className="text-small text-gray-500">Rating</span>
            </div>
            <div className="w-fit h-full flex flex-col justify-center items-center">
              <p className="text-x-medium text-gray-300">
                {movieData.budget ? movieData.budget.toLocaleString() : 0}
              </p>
              <span className="text-small text-gray-500">Budget</span>
            </div>
            <div className="w-fit h-full flex flex-col justify-center items-center">
              <p className="text-x-medium text-gray-300">
                {movieData.startYear}
              </p>
              <span className="text-small text-gray-500">Year</span>
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
                RunTime: <span>{movieData.runtimeMinutes} minutes</span>
              </p>
              <p className="info">
                ReleaseDate: <span>{movieData.releaseDate}</span>
              </p>
              <p className="info">
                Languages:{" "}
                {movieData.spokenLanguages?.map((language) => (
                  <span key={Math.random()}>{language}</span>
                )) || "EN"}
              </p>
              <p className="info">
                Filming Locations:{" "}
                {movieData.filmingLocations?.map((location) => (
                  <span key={Math.random()}>{location}</span>
                ))}
              </p>
              <p className="info">
                Interests:{" "}
                {movieData.interests?.map((interest) => (
                  <span key={Math.random()}>{interest}, </span>
                ))}
              </p>
              <p className="info">
                Votes: <span>{movieData.numVotes?.toLocaleString() || 0}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
