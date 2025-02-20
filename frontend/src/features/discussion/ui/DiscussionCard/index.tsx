import { Link } from '@tanstack/react-router';

import { useSafeContext } from '@/hooks/useSafeContext';

import type { DiscussionDTO } from '../../model';
import { DiscussionContext } from '../DiscussionTitle/DiscussionContext';
import { DiscussionLarge } from './DiscussionLarge';
import { DiscussionSmall } from './DiscussionSmall';

interface DiscussionCardProps {
  size: 'sm' | 'lg';
  discussion: DiscussionDTO;
  rank?: number;
}

const DiscussionCard = ({ size, discussion, rank }: DiscussionCardProps) => {
  const { discussionId } = useSafeContext(DiscussionContext);
  return (
    <Link
      params={{ id: discussionId.toString() }}
      state={{ candidate: {
        adjustCount: discussion.usersForAdjust.length,
        startDateTime: discussion.startDateTime,
        endDateTime: discussion.endDateTime,
        // TODO: selectedParticipantIds를 외부에서 주입 (현재는 모든 참여자가 선택된 것으로 간주됨)
        selectedParticipantIds: discussion.usersForAdjust.map((user) => user.id),
      } }}
      to={'/discussion/candidate/$id'}
    >
      {size === 'lg' ? 
        <DiscussionLarge discussion={discussion} rank={rank as number} /> 
        : 
        <DiscussionSmall discussion={discussion} />}
    </Link>
  ); 
};

export default DiscussionCard;