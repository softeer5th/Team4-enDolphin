
import { vars } from '../../theme/index.css';
import { IconDotsMono } from '../Icon';
import { Text } from '../Text';
import { SEPARATOR } from '.';
import { dotContainerStyle, paginationItemStyle } from './index.css';

export type PaginationItemType = number | typeof SEPARATOR;

interface PaginationItemProps {
  item: PaginationItemType;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationItem = ({ item, currentPage, onPageChange }: PaginationItemProps) => {
  // 구분자 렌더링
  if (item === SEPARATOR) {
    return (
      <span className={dotContainerStyle} key={SEPARATOR}>
        <IconDotsMono fill={vars.color.Ref.Netural[800]} width={20} />
      </span>
    );
  }

  // pagination 버튼 렌더링
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
};

export default PaginationItem;
