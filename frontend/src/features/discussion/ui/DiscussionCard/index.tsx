import { useParams } from '@tanstack/react-router';

import { useDiscussionConfirmMutation } from '../../api/mutations';
import type { DiscussionDTO } from '../../model';
import { DiscussionLarge } from './DiscussionLarge';
import { DiscussionSmall } from './DiscussionSmall';

interface DiscussionCardProps {
  size: 'sm' | 'lg';
  discussion: DiscussionDTO;
  rank?: number;
}

const DiscussionCard = ({ size, discussion, rank }: DiscussionCardProps) => {
  const param: { id: string } = useParams({ from: '/_main/discussion/$id' });
  const { mutate } = useDiscussionConfirmMutation();

  const handleClickConfirm = () => {
    if (!param.id) return;
    mutate({
      id: param.id, 
      body: {
        startDateTime: discussion.startDateTime,
        endDateTime: discussion.endDateTime,
      }, 
    });
  };

  return (
    size === 'lg' ? 
      <DiscussionLarge
        discussion={discussion}
        onClick={handleClickConfirm}
        rank={rank as number}
      /> : 
      <DiscussionSmall 
        discussion={discussion}
        onClick={handleClickConfirm}
      />
  );
};

export default DiscussionCard;