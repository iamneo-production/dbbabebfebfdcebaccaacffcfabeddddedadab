import React, { useState, useEffect } from 'react';
import fetchData from './utillity';

function Search() {
  const [searchTerm, setSearchTerm] = useState('Programming');
  const [results, setResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timeoutId); // Clear any existing timeout when searchTerm changes.
      const newTimeoutId = setTimeout(() => {
        fetchData(searchTerm, setResults);
      }, 500);
      setTimeoutId(newTimeoutId); // Store the new timeout ID.
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchInputBlur = () => {
    setTimeout(() => {
      setResults([]);
    }, 200);
  };

  return (
    <div>
      Learn React
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onBlur={handleSearchInputBlur}
        placeholder="Type your search term"
        data-testid="searchterm"
      />
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <a href={result.url} data-testid="suggestion">
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
