import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { useDiscussionContext } from '@/pages/MyCalendarPage/DiscussionContext';
import { calcSizeByDate } from '@/utils/date/position';

import { discussionBoxStyle } from './index.css';

export const CalendarDiscussionBox = () => {
  const { selectedDateRange } = useDiscussionContext();
  const { selectedWeek } = useSharedCalendarContext();
  if (!selectedDateRange) return null;
 
  const { start, end } = selectedDateRange;
  const sizePosition = calcSizeByDate({ start, end }, selectedWeek);

  if (!sizePosition) return null;
  const { x, y, width, height } = sizePosition;
  
  return (
    <div
      className={discussionBoxStyle}
      style={{
        position: 'absolute',
        top: 16 + y,
        left: `calc(((100% - 72px) / 7 * ${x}) + 72px)`,
        width: `calc((100% - 72px) / 7 * ${width})`,
        height,
      }}
    />
  );
};