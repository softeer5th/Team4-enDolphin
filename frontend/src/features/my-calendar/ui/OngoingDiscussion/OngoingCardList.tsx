import { useState } from 'react';

import { useOngoingQuery } from '@/features/shared-schedule/api/queries';
import type { OngoingSchedule } from '@/features/shared-schedule/model';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDiscussionContext } from '@/pages/MyCalendarPage/DiscussionContext';
import { parseTime } from '@/utils/date';

import { OngoingCardItem } from './OngoingCardItem';

export const OngoingCardList = () => {
  const { data, isPending } = useOngoingQuery(1, 3, 'ALL');
  const { handleSelectDateRange, reset } = useDiscussionContext();
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);

  const handleClickSelect = (discussion: OngoingSchedule | null) => {
    if (!discussion) {
      setSelectedDiscussion(null);
      reset();
      return;
    }
    const start = new Date(discussion.dateRangeStart);
    const end = new Date(discussion.dateRangeEnd);
    const { hour: sh, minute: sm } = parseTime(discussion.timeRangeStart);
    const { hour: eh, minute: em } = parseTime(discussion.timeRangeEnd);
    start.setHours(sh);
    start.setMinutes(sm);
    end.setHours(eh);
    end.setMinutes(em);

    setSelectedDiscussion(discussion.discussionId);
    handleSelectDateRange(start, end);
  };

  const cardRef = useClickOutside<HTMLDivElement>(()=>handleClickSelect(null));

  if (isPending || !data) return null;

  return data.ongoingDiscussions.map((discussion) => (
    <OngoingCardItem
      isSelected={selectedDiscussion === discussion.discussionId}
      key={discussion.discussionId}
      onClick={()=>handleClickSelect(discussion)}
      ref={cardRef}
      {...discussion}
    />
  ));
};