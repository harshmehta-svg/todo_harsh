// src/components/Pagination.js

import React from 'react';

const Pagination = ({ total, currentPage, onChange }) => {
  const pagesCount = Math.ceil(total / 10);
  const numbers = [];
  for (let i = 1; i <= pagesCount; i++) {
    numbers.push(i);
  }

  const handlePageChange = (page) => {
    onChange(page);
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      {numbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? 'active' : ''}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Pagination;