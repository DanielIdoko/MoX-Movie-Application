import React from "react";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import Main from "../../store/main";
import { ImageBaseUrl } from "../../utils/API";

// Confirmation Modal
const ConfirmModal = ({
  handleToggleConfirmModal,
  deleteSavedMovie,
  movie,
}) => {
  return (
    <div className="w-screen h-dvh bg-black/50 backdrop-blur-sm flex items-center justify-center fixed top-0 right-0 z-50">
      <div className="bg-dark p-4 w-80 h-44 flex flex-col items-center justify-center rounded-xl">
        <p className="text-gray-300 text-sm p-3 text-center">
          Are you sure you want to delete this movie from Saved Movies?
        </p>
        <div className="w-full flex items-center justify-center gap-2">
          <button
            className="text-sm bg-gray-700 text-gray-300 rounded p-2 px-5 cursor-pointer"
            onClick={handleToggleConfirmModal}
          >
            Cancel
          </button>
          <button
            className="text-sm bg-red-600/20 text-red-400 rounded p-2 px-5 cursor-pointer"
            onClick={() => {
              deleteSavedMovie(movie.id);
              handleToggleConfirmModal();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component
const SavedMovie = ({ movie, handleToggleConfirmModal, confirmModalShown }) => {
  const { handleDeleteMovie } = Main();

  return (
    <li className="w-full h-16 p-1 flex items-center justify-between border border-transparent hover:border-blue-900/20 transition">
      {confirmModalShown && (
        <ConfirmModal
          handleToggleConfirmModal={handleToggleConfirmModal}
          deleteSavedMovie={handleDeleteMovie}
          movie={movie}
        />
      )}

      <Link
        className="flex items-center gap-4 flex-1 overflow-hidden"
        to={`/movie/${movie.id}`}
      >
        <img
           src={ImageBaseUrl + movie.poster_path ? ImageBaseUrl + movie.poster_path : PosterImage}
          className="w-12 h-12 rounded-full object-cover"
          alt={movie.original_title}
        />
        <div className="flex flex-col">
          <p className="text-sm font-bold text-gray-200">
            {movie.original_title}
          </p>
        </div>
      </Link>

      <button
        className="p-2 hover:bg-red-600/10 rounded-full cursor-pointer"
        onClick={handleToggleConfirmModal}
      >
        <FiTrash className="text-red-400" />
      </button>
    </li>
  );
};

export default SavedMovie;
