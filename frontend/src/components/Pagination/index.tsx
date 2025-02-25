import clsx from '@/utils/clsx';

import {
  paginationContainerStyle,
} from './index.css';
import PaginationItem from './PaginationItem';

const PAGE_LIMIT = 8;
export const SEPARATOR = 'separator';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  onPageButtonHover?: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageButtonHover,
  className,
}: PaginationProps) => {
  const pages = getPaginationItems(currentPage, totalPages);

  return (
    totalPages > 1 &&
    <div className={clsx(paginationContainerStyle, className)}>
      {pages.map((item, index) => 
        <PaginationItem 
          currentPage={currentPage} 
          item={item} 
          key={index}
          onHover={onPageButtonHover}
          onPageChange={onPageChange}
        />,
      )}
    </div>
  );
};

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): (number | 'separator')[] => {
  // 총 페이지가 페이지 제한보다 작을 경우
  if (totalPages <= PAGE_LIMIT) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // 예시) 1 2 3 4 5 6 7 ... 10
  if (currentPage <= Math.floor(PAGE_LIMIT / 2) + 1) {
    const frontPages = Array.from({ length: PAGE_LIMIT - 1 }, (_, i) => i + 1);
    return [...frontPages, SEPARATOR, totalPages];
  }
  // 예시) 1 ... 4 5 6 7 8 9 10
  if (currentPage >= totalPages - Math.floor(PAGE_LIMIT / 2)) {
    const rearPages = Array.from(
      { length: PAGE_LIMIT - 1 },
      (_, i) => totalPages - PAGE_LIMIT + 2 + i,
    );
    return [1, SEPARATOR, ...rearPages];
  }
  // 예시) 1 ... 3 4 5 6 7 ... 10
  const middlePageCount = PAGE_LIMIT - 3;
  const middlePages = Array.from(
    { length: middlePageCount },
    (_, i) => i + currentPage - Math.floor(middlePageCount / 2),
  );
  return [
    1, 
    SEPARATOR,
    ...middlePages,
    SEPARATOR,
    totalPages,
  ];
};

export default Pagination;
