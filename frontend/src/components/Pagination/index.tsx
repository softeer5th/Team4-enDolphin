import { vars } from '../../theme/index.css';
import { IconDotsMono } from '../Icon';
import { Text } from '../Text';
import {
  dotContainerStyle,
  paginationContainerStyle,
  paginationItemStyle,
} from './index.css';

const PAGE_LIMIT = 8;
const SEPARATOR = 'separator';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = getPaginationItems(currentPage, totalPages);

  return (
    <div className={paginationContainerStyle}>
      {pages.map((item, index) => {
        if (item === SEPARATOR) {
          return (
            <span className={dotContainerStyle} key={`separator-${index}`}>
              <IconDotsMono fill={vars.color.Ref.Netural[800]} width={20} />
            </span>
          );
        }
        
        const isSelected = item === currentPage;
        return (
          <button
            className={paginationItemStyle({ selected: isSelected })}
            key={`page-${item}`}
            onClick={() => onPageChange(item)}
          >
            <Text typo={isSelected ? 't2' : 'b2M'}>{item}</Text>
          </button>
        );
      })}
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
  // 현재 페이지가 첫 4페이지일 경우
  if (currentPage <= Math.floor(PAGE_LIMIT / 2) + 1) {
    return [...Array.from({ length: PAGE_LIMIT - 1 }, (_, i) => i + 1), SEPARATOR, totalPages];
  }
  // 현재 페이지가 마지막 4페이지일 경우
  if (currentPage >= totalPages - Math.floor(PAGE_LIMIT / 2)) {
    return [1, SEPARATOR, ...Array.from({ length: PAGE_LIMIT - 1 }, (_, i) => totalPages - 6 + i)];
  }
  // 페이지가 중간에 위치할 경우
  return [
    1, 
    SEPARATOR,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    SEPARATOR,
    totalPages,
  ];
};

export default Pagination;
