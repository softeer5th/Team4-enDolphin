import { useDiscussionContext } from '@/pages/MyCalendarPage/DiscussionContext';
import { isNextWeek } from '@/utils/date';
import { calcPositionByDate } from '@/utils/date/position';

import { discussionBoxStyle } from './index.css';

export const CalendarDiscussionBox = () => {
  const { selectedDateRange } = useDiscussionContext();
  if (!selectedDateRange) return null;
  const { start, end } = selectedDateRange;

  const { x: sx, y: sy } = calcPositionByDate(start);
  const { x: ex, y: ey } = calcPositionByDate(end);
  const dayDiff = isNextWeek(start, end) ? 7 - sx : ex - sx;
  const height = ey - sy;

  return (
    <div
      className={discussionBoxStyle}
      style={{
        position: 'absolute',
        top: 16 + sy,
        left: `calc(((100% - 72px) / 7 * ${sx}) + 72px)`,
        width: `calc((100% - 72px) / 7 * ${dayDiff})`,
        height,
      }}
    />
  );
};