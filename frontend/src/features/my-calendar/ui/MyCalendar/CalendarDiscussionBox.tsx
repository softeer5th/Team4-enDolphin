import { useDiscussionContext } from '@/pages/MyCalendarPage/DiscussionContext';
import { calcPositionByDate } from '@/utils/date/position';

import { discussionBoxStyle } from './index.css';

export const CalendarDiscussionBox = () => {
  const { selectedDateRange } = useDiscussionContext();
  if (!selectedDateRange) return null;

  const { x: sx, y: sy } = calcPositionByDate(selectedDateRange.start);
  const { x: ex, y: ey } = calcPositionByDate(selectedDateRange.end);

  return (
    <div
      className={discussionBoxStyle}
      style={{
        position: 'absolute',
        left: `calc(((100% - 72px) / 7 * ${sx}) + 72px)`,
        right: `calc(((100% - 72px) / 7 * ${6 - ex}) + 72px)`,
        top: 16 + sy,
        bottom: 16 + (24 - ey),
      }}
    />
  );
};