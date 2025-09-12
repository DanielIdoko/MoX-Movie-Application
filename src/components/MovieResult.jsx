import React, { Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import Main from "../store/main";
import { FiHeart } from "react-icons/fi";
import ImageSkeleton from "./Skeleton/ImageSkeleton";

const MovieResult = ({ result }) => {
  const { handleSaveMovie, handleToggleModal, modalShown } = Main();

  const handleSave = useCallback(() => {
    handleSaveMovie(result);
    handleToggleModal();
  }, [modalShown]);

  return (
    <li className="w-44 md:w-48 h-60 bg-dark relative p-1 rounded-2xl cursor-pointer overflow-hidden">
      <Link to={`/movie/${result.id}`} state={{ result }}>
        <div className="w-full h-fit relative z-10">
          <button
            className="text-gray-500 p-1 text-medium flex items-center justify-center absolute right-2 top-2 transition duration-200 ease-in rounded-full cursor-pointer hover:bg-gray-400/10 hover:text-white"
            onClick={() => handleSave()}
          >
            <FiHeart />
          </button>
        </div>
        <div className="w-full h-auto overflow-hidden rounded-xl">
          <Suspense fallback={<ImageSkeleton />}>
            <img
              src={
                decodeURIComponent(result.primaryImage).length > 10
                  ? result.primaryImage
                  : PosterImage
              }
              alt={result.originalTitle}
              className="w-full h-40
          40 object-cover"
            />
          </Suspense>
        </div>

        <p className="text-small text-gray-200 pt-2">{result.originalTitle}</p>
        <span className="text-sm pt-2 pb-1 text-gray-600 font-bold ">
          {result.averageRating}⭐
        </span>
      </Link>
    </li>
  );
};

export default MovieResult;
