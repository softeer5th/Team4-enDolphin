import { Link, useParams } from '@tanstack/react-router';

import { useMemberContext } from '@/pages/DiscussionPage/MemberContext';

import type { DiscussionDTO } from '../../model';
import { DiscussionLarge } from './DiscussionLarge';
import { DiscussionSmall } from './DiscussionSmall';

interface DiscussionCardProps {
  size: 'sm' | 'lg';
  discussion: DiscussionDTO;
  rank?: number;
}

const DiscussionCard = ({ size, discussion, rank }: DiscussionCardProps) => {
  const { id } = useParams({ from: '/_main/discussion/$id' });
  const memberContext = useMemberContext();
  return (
    <Link
      params={{ id: id }}
      state={{ candidate: {
        adjustCount: discussion.usersForAdjust.length,
        startDateTime: discussion.startDateTime,
        endDateTime: discussion.endDateTime,
        selectedParticipantIds: memberContext?.formState.checkedList ?? []
        ,
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