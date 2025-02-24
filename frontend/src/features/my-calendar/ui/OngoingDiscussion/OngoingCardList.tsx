import { useState } from 'react';

import { useOngoingQuery } from '@/features/shared-schedule/api/queries';
import type { OngoingSchedule } from '@/features/shared-schedule/model';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDiscussionContext } from '@/pages/MyCalendarPage/DiscussionContext';

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
    setSelectedDiscussion(discussion.discussionId);
    handleSelectDateRange(
      new Date(discussion.dateRangeStart), 
      new Date(discussion.dateRangeEnd),
    );
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