import React, { Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { PosterImage } from "../assets";
import { FiHeart } from "react-icons/fi";
import Main from "../store/main";
import { AiFillHeart } from "react-icons/ai";
import ImageSkeleton from "./Skeleton/ImageSkeleton";

export default function MovieCard({ movieData, movieState }) {
  // Saved movies state gotten from Main store to track interaction with saved movies
  const { handleSaveMovie, savedMovies, handleToggleModal, modalShown } = Main();

  const handleSave = useCallback(() => {
    handleSaveMovie(movieData);
    handleToggleModal();
  }, [modalShown]);

  return (
    <Link
      to={`/movie/${movieData.id}`}
      className="movie-card"
      state={{ movieState }}
    >
      <div className="w-full h-fit relative z-10">
        <button
            className="text-gray-500 p-1 text-medium flex items-center justify-center absolute right-2 top-2 transition duration-200 ease-in rounded-full cursor-pointer hover:bg-gray-400/10 hover:text-white"
          onClick={() => handleSave()}
        >
          {/* {savedMoves?.forEach(movies => {
            movies.isSaved ? ( */}
              <FiHeart />
          {/* //   ) : ( */}
          {/* //     <AiFillHeart /> */}
          {/* //   ) */}
          {/* // })} */}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl">
        <Suspense fallback={<ImageSkeleton/>}>
          <img
          src={
            decodeURIComponent(movieData.primaryImage).length > 10
              ? movieData.primaryImage
              : PosterImage
          }
          alt={movieData.originalTitle}
          className="w-full h-40
          40 object-cover"
        />
        </Suspense>
      </div>

      <p className="text-small text-gray-200 pt-2">
        {movieData.originalTitle.length > 20
          ? movieData.originalTitle.slice(0, 18) + "..."
          : movieData.originalTitle}
      </p>

      {/* Rating */}
      <span className="text-sm pt-2 pb-1 text-gray-600 font-bold ">
        ⭐ {movieData.averageRating ? movieData.averageRating : 3}
      </span>
    </Link>
  );
}
