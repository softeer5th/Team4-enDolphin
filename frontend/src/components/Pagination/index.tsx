import React from 'react';

import { Text } from '../Text';
import {
  paginationContainer,
  paginationItem,
} from './index.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className={paginationContainer}>
      {pages.map((page) => (
        <button
          className={paginationItem({ active: page === currentPage })}
          key={page}
          onClick={() => onPageChange(page)}
        >
          <Text typo={page === currentPage ? 't2' : 'b2M'}>{page}</Text>
        </button>
      ))}
    </div>
  );
};
