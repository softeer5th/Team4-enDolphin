import { Link, useParams } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

import { checkboxAtom } from '@/store/discussion';

import type { DiscussionDTO } from '../../model';
import { linkStyle } from './card.css';
import { DiscussionLarge } from './DiscussionLarge';
import { DiscussionSmall } from './DiscussionSmall';

interface DiscussionCardProps {
  size: 'sm' | 'lg';
  discussion: DiscussionDTO;
  rank?: number;
}

const DiscussionCard = ({ size, discussion, rank }: DiscussionCardProps) => {
  const { id } = useParams({ from: '/_main/discussion/$id' });
  const checkedList = useAtomValue(checkboxAtom);
  return (
    <Link
      className={linkStyle}
      params={{ id: id }}
      state={{ candidate: {
        adjustCount: discussion.usersForAdjust.length,
        startDateTime: discussion.startDateTime,
        endDateTime: discussion.endDateTime,
        selectedParticipantIds: checkedList ?? undefined,
      } }}
      to='/discussion/candidate/$id'
    >
      {size === 'lg' ? 
        <DiscussionLarge discussion={discussion} rank={rank as number} /> 
        : 
        <DiscussionSmall discussion={discussion} />}
    </Link>
  ); 
};

export default DiscussionCard;