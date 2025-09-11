import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { PosterImage } from '../assets'
import { FiHeart } from 'react-icons/fi'
import Main from '../store/main'

export default function MovieCard({ movieData, movieState }) {
  //Saved movie/is movie saved dtate gotten from our Main store
  const { handleSaveMovie, handleToggleModal, modalShown } = Main();

  const handleSave = useCallback(() =>{
    handleSaveMovie(movieData);
    handleToggleModal();
  },[modalShown])

  return (
    <Link
      to={`/movie/${movieData.id}`}
      className='movie-card'
      state={{ movieState }}>
      <div className="w-full h-auto overflow-hidden rounded-xl">
        <img
          src={decodeURIComponent(movieData.primaryImage).length > 10 ? movieData.primaryImage : PosterImage} alt={movieData.originalTitle}
          className='w-full h-40
          40 object-cover'
        />
      </div>
      <div className='w-full h-fit relative'>
        <p className='text-small text-gray-200 pt-2'>{movieData.originalTitle.slice(0, 15) + "..."}</p>
        <button className='saved-btn' onClick={() => handleSave()}>
          <FiHeart />
        </button>
        {/* Rating */}
        <span className='text-sm pt-2 pb-1 text-gray-600 font-bold '>
          ⭐ {movieData.averageRating ? movieData.averageRating : 3}
        </span>
      </div>
    </Link>
  )
}
