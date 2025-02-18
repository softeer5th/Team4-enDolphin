import { useState } from 'react';

export const usePagination = (
  initialPage: number,
  totalPages: number,
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    onPageChange,
    totalPages,
  };
};
