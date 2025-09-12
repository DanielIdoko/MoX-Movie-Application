import React from 'react'
import Main from '../store/main'
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {

    const navigate = useNavigate();

    const { handleSearch, handleChange, searchTerm } = Main();
    // // Handle submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(navigate)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full md:w-[400px] lg:w-[500px] lg:h-10 flex items-center md:gap-2 p-1 lg:mr-11'>
            <input
                type="search"
                value={searchTerm}
                className='w-[78%] h-full rounded-md text-small text-white p-3 focus:outline-1 focus:outline-gray-800 bg-dark/10 backdrop-blur-md search-input'
                onChange={(e) => handleChange(e.target.value)}
                placeholder='Search Movies' />
            <button className='bg-primary-color text-white rounded-md p-1 pl-3 pr-3 ml-2 md:ml-0 cursor-pointer' onClick={() => handleSearch(navigate)}>Search</button>
        </form>
    )
}

export default SearchInput
