import { useState } from 'react';

import { useOngoingQuery } from '@/features/shared-schedule/api/queries';
import { useClickOutside } from '@/hooks/useClickOutside';

import { OngoingCardItem } from './OngoingCardItem';

export const OngoingCardList = () => {
  const { data, isPending } = useOngoingQuery(1, 3, 'ALL');
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);

  const handleClickSelect = (id: number | null) => {
    setSelectedDiscussion(id);
  };
  const cardRef = useClickOutside<HTMLDivElement>(()=>handleClickSelect(null));

  if (isPending || !data) return null;

  return data.ongoingDiscussions.map(({ discussionId, ...discussion }) => (
    <OngoingCardItem
      isSelected={selectedDiscussion === discussionId}
      key={discussionId}
      onClick={()=>handleClickSelect(discussionId)}
      ref={cardRef}
      {...discussion}
    />
  ));
};