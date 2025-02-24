import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { useDiscussionContext } from '@/pages/MyCalendarPage/DiscussionContext';
import { isNextWeek, setDateOnly } from '@/utils/date';
import { calcPositionByDate } from '@/utils/date/position';

import { discussionBoxStyle } from './index.css';

export const CalendarDiscussionBox = () => {
  const { selectedDateRange } = useDiscussionContext();
  const { selectedWeek } = useSharedCalendarContext();
  if (!selectedDateRange) return null;

  // TODO: 테스트 코드 작성
  const { start, end } = selectedDateRange;
  if (start > selectedWeek[6] || end < selectedWeek[0]) return null;

  const startDate = start > selectedWeek[0] ? start : setDateOnly(start, selectedWeek[0]);
  const endDate = end < selectedWeek[6] ? end : setDateOnly(end, selectedWeek[6]);

  const { x: sx, y: sy } = calcPositionByDate(startDate);
  const { x: ex, y: ey } = calcPositionByDate(endDate);
  const dayDiff = isNextWeek(start, end) ? 7 - sx : ex - sx;
  const height = ey - sy;

  return (
    <div
      className={discussionBoxStyle}
      style={{
        position: 'absolute',
        top: 16 + sy,
        left: `calc(((100% - 72px) / 7 * ${sx}) + 72px)`,
        width: `calc((100% - 72px) / 7 * ${dayDiff + 1})`,
        height,
      }}
    />
  );
};