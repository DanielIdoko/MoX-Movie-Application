import React, { useEffect, useState } from 'react';
import useFetchMovies from '../../store/useFetchMovies';
import Spinner from '../Spinner';
import MovieCard from '../MovieCard';
// Help Generate random id's for movies to prevent colliding id's  
import { v4 as uuid4 } from 'uuid';


const SimilarMovies = ({ movie }) => {
    const [similarMovies, setSimilarMovies] = useState([]);
    const { filterMovies, filteredMovies, isLoading, error: errorMessage } = useFetchMovies();

    
    // Handle the case where the movie prop is not provided.
    if (!movie) {
        return <p className='text-gray-500 text-small p-3'>Movie not found.</p>;
    }

    // Using a separate useEffect to handle the state update when filteredMovies changes
    useEffect(() => {
        filterMovies(movie.genres[1]);
        if (filteredMovies.length > 0) {
            setSimilarMovies(filteredMovies.reverse());
        }
    }, [movie]);

    return (
        <ul className='w-full h-auto mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-items-center md:justify-items-start md:px-3'>
            {isLoading ? (
                <Spinner />
            ) : errorMessage ? (
                <p className='text-red-600 text-small'>{errorMessage}</p>
            ) : similarMovies.length > 0 ? (
                similarMovies.slice(0, 5).map((similarMovie) => (
                    <MovieCard movieData={similarMovie} key={uuid4()} state={similarMovie} />
                ))
            ) : (
                <p className='text-gray-500 text-small'>No similar movies found.</p>
            )}
        </ul>
    );
};

export default SimilarMovies;