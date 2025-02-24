import { useState } from 'react';

import { useOngoingQuery } from '@/features/shared-schedule/api/queries';

import { OngoingCardItem } from './OngoingCardItem';

export const OngoingCardList = () => {
  const { data, isPending } = useOngoingQuery(1, 3, 'ALL');
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  if (isPending || !data) return null;

  const handleClickSelect = (id: number) => {
    setSelectedDiscussion(id);
  };

  return data.ongoingDiscussions.map(({ discussionId, ...discussion }) => (
    <OngoingCardItem
      isSelected={selectedDiscussion === discussionId}
      key={discussionId}
      onClick={()=>handleClickSelect(discussionId)}
      {...discussion}
    />
  ));
};