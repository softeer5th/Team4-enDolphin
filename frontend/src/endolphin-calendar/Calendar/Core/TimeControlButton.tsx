import Button from '@/components/Button';
import { ChevronLeft, ChevronRight } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import { useCalendarContext } from '../context/CalendarTableContext';
import { timeControlButtonStyle } from './index.css';

export const TimeControlButton = ({ type }: { type: 'prev' | 'next' | 'today' }) => {
  const { handleClickPrevWeek, handleClickNextWeek, handleClickToday } = useCalendarContext();
  switch (type) {
    case 'prev':
      return (
        <button
          aria-label='이전 주' 
          className={timeControlButtonStyle({ order: 'first' })}
          onClick={handleClickPrevWeek}
        >
          <ChevronLeft clickable fill={vars.color.Ref.Netural[600]} />
        </button>
      );
    case 'next':
      return (
        <button
          aria-label='다음 주'
          className={timeControlButtonStyle({ order: 'last' })} 
          onClick={handleClickNextWeek}
        >
          <ChevronRight clickable fill={vars.color.Ref.Netural[600]} />
        </button>
      );
    case 'today':
      return (
        <Button
          aria-label='오늘'
          onClick={handleClickToday}
          style='outline'
          variant='secondary'
        >
          오늘
        </Button>
      );
    default: 
      return null;
  }
};
