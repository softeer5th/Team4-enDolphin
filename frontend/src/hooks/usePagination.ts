import { useState } from 'react';

export const usePagination = (
  initialPage: number,
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    handlePageChange,
  };
};
