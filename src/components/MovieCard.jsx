import React, { Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { PosterImage } from "../assets";
import { FiHeart } from "react-icons/fi";
import Main from "../store/main";
import { AiFillHeart } from "react-icons/ai";
import ImageSkeleton from "./Skeleton/ImageSkeleton";
import { ImageBaseUrl } from "../utils/API";

export default function MovieCard({ movieData, movieState }) {
  // Saved movies state gotten from Main store to track interaction with saved movies
  const { handleSaveMovie, savedMovies, handleToggleModal, modalShown } =
    Main();

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
        <Suspense fallback={<ImageSkeleton />}>
          <img
            src={
              decodeURIComponent(`${ImageBaseUrl}${movieData.poster_path}`)
                .length > 10
                ? `${ImageBaseUrl}${movieData.poster_path}`
                : PosterImage
            }
            alt={movieData.original_title}
            className="w-full h-40
          40 object-cover"
          />
        </Suspense>
      </div>

      <p className="text-small text-gray-200 pt-2">
        {movieData.original_title.length > 20
          ? movieData.original_title.slice(0, 18) + "..."
          : movieData.original_title}
      </p>
    </Link>
  );
}
