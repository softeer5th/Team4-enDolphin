import type { DiscussionDTO } from '../../model';
import { DiscussionLarge } from './DiscussionLarge';
import { DiscussionSmall } from './DiscussionSmall';

interface DiscussionCardProps {
  size: 'sm' | 'lg';
  discussion: DiscussionDTO;
  rank?: number;
}

const DiscussionCard = ({ size, discussion, rank }: DiscussionCardProps) => (
  size === 'lg' ? <DiscussionLarge discussion={discussion} rank={rank as number} /> 
    : <DiscussionSmall discussion={discussion} />
);

export default DiscussionCard;