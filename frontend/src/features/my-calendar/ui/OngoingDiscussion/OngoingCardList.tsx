import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { useOngoingQuery } from '@/features/shared-schedule/api/queries';
import type { OngoingSchedule } from '@/features/shared-schedule/model';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDiscussionContext } from '@/pages/MyCalendarPage/DiscussionContext';
import { useTableContext } from '@/pages/MyCalendarPage/TableContext';
import { parseTime, setTimeOnly } from '@/utils/date';

import { OngoingCardItem } from './OngoingCardItem';

const formatDateTimeRange = (
  { dateRangeStart, dateRangeEnd, timeRangeStart, timeRangeEnd }: OngoingSchedule,
) => {
  const start = new Date(dateRangeStart);
  const end = new Date(dateRangeEnd);
  const { hour: sh, minute: sm } = parseTime(timeRangeStart);
  const { hour: eh, minute: em } = parseTime(timeRangeEnd);

  return { start, end, sh, sm, eh, em };
};

export const OngoingCardList = () => {
  const { data, isPending } = useOngoingQuery(1, 2, 'ALL');
  const { selectedWeek } = useSharedCalendarContext();
  const { selectedId, setSelectedId, handleSelectDateRange, reset } = useDiscussionContext();
  const { handleSelectDate } = useSharedCalendarContext();
  const { handleSelectTime } = useTableContext();

  const handleClickSelect = (discussion: OngoingSchedule | null) => {
    if (!discussion) {
      setSelectedId(null);
      reset();
      return;
    }
    
    const { start, end, sh, sm, eh, em } = formatDateTimeRange(discussion);
    setSelectedId(discussion.discussionId);
    handleSelectDateRange(
      setTimeOnly(start, { hour: sh, minute: sm }), 
      setTimeOnly(end, { hour: eh, minute: em }),
    );
    handleSelectTime({ hour: sh, minute: sm });

    if (selectedWeek[6] < start || selectedWeek[0] > end) handleSelectDate(start);
  };

  const cardRef = useClickOutside<HTMLDivElement>(()=>handleClickSelect(null));

  if (isPending || !data) return null;

  return data.ongoingDiscussions.map((discussion) => (
    <OngoingCardItem
      isSelected={selectedId === discussion.discussionId}
      key={discussion.discussionId}
      onClick={()=>handleClickSelect(discussion)}
      ref={cardRef}
      {...discussion}
    />
  ));
};