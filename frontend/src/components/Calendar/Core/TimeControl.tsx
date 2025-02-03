import { vars } from '@/theme/index.css';
import { formatDateToWeek } from '@/utils/date';

import Button from '../../Button';
import { ChevronLeft, ChevronRight } from '../../Icon';
import { Text } from '../../Text';
import { useCalendarContext } from '../context/CalendarContext';
import { 
  timeConrolButtonStyle, 
  timeControlButtonWrapperStyle, 
  timeControlStyle,
} from './index.css';

export const TimeControl = () => {
  const { 
    selected,
    handleClickToday, 
    handleClickPrevWeek, 
    handleClickNextWeek,
  } = useCalendarContext();
  const { year, month, week  } = formatDateToWeek(selected);
  const weekString = `${year}년 ${month}월 ${week}`;

  return  (
    <div className={timeControlStyle}>
      <div className={timeControlButtonWrapperStyle}>
        <button
          className={timeConrolButtonStyle({ order: 'first' })} 
          onClick={handleClickPrevWeek}
        >
          <ChevronLeft fill={vars.color.Ref.Netural[600]} />
        </button>
        <span className={timeConrolButtonStyle({ order: 'mid' })}>
          <Text>{weekString}</Text>
        </span>
        <button
          className={timeConrolButtonStyle({ order: 'last' })} 
          onClick={handleClickNextWeek}
        >
          <ChevronRight fill={vars.color.Ref.Netural[600]} />
        </button>
      </div>
      <Button
        onClick={handleClickToday}
        style='outline'
        type='secondary'
      >
        오늘
      </Button>
    </div>
  );
};