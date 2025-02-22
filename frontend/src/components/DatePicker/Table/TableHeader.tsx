import { DowCell } from './Cell';
import { holidayCellStyle, saturdayCellStyle, weekdayCellStyle } from './Cell/index.css';
import { dowCellWrapperStyle } from './index.css';
import RowContainer from './RowContainer';

const days = [
  { label: '일', style: holidayCellStyle },
  { label: '월', style: weekdayCellStyle },
  { label: '화', style: weekdayCellStyle },
  { label: '수', style: weekdayCellStyle },
  { label: '목', style: weekdayCellStyle },
  { label: '금', style: weekdayCellStyle },
  { label: '토', style: saturdayCellStyle },
];

const TableHeader = () => (
  <RowContainer>
    {days.map(({ label, style }, i) => (
      <div className={dowCellWrapperStyle}  key={`${label}-${i}`}>
        <DowCell className={style}>
          {label}
        </DowCell>
      </div>
    ))}
  </RowContainer>
);
export default TableHeader;
