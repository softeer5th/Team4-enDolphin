import { useNavigateToCandidate } from '@/hooks/useNavigateToCandidate';

import type { DiscussionDTO } from '../../model';
import { cardWrapperStyle } from './card.css';
import { DiscussionLarge } from './DiscussionLarge';
import { DiscussionSmall } from './DiscussionSmall';

interface DiscussionCardProps {
  size: 'sm' | 'lg';
  discussion: DiscussionDTO;
  rank?: number;
}

const DiscussionCard = ({ size, discussion, rank }: DiscussionCardProps) => {
  const { handleNavigateToCandidate } = useNavigateToCandidate(discussion);

  return (
    <div className={cardWrapperStyle} onClick={handleNavigateToCandidate}>
      {size === 'lg' ? 
        <DiscussionLarge discussion={discussion} rank={rank as number} /> 
        : 
        <DiscussionSmall discussion={discussion} />}
    </div>
  ); 
};

export default DiscussionCard;