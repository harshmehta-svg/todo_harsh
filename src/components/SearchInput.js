import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importing the useDebounce hook for debouncing the search input
import useDebounce from './useDebounce';

function SearchInput() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchValue) {
        try {
          const response = await axios.get(`/api/search?q=${debouncedSearchValue}`);
          setSuggestions(response.data);
        } catch (error) {
          setError(error.message);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchValue]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;