import React, { useContext } from 'react';
import Image from 'next/image';
import { AppContext } from '../../context/AppContext';

function Search() {
  const { exercises, setFilteredExercises, setActiveCategory } = useContext(AppContext);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setActiveCategory(null)

    if (searchTerm === '') {
      // If search term is empty, reset the exercises to show all
      setFilteredExercises(exercises);
    } else {
      // Filter exercises based on the search term
      const filter = exercises.filter((exercise) =>
        exercise.exercise_name.toLowerCase().includes(searchTerm)
      );

      setFilteredExercises(filter);
    }
  };

  return (
    <div className="relative w-full">
      <Image
        src={`/search-icon.svg`}
        alt="Icon"
        width={20}
        height={20}
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
      />
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search"
        className="bg-darkGray py-4 px-12 rounded-xl w-full placeholder-lightGray focus:outline-none font-medium"
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
