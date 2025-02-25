import type { DiscussionDTO } from '../../model';
import DiscussionDetailLink from '../DiscussionDetailLink';
import { DiscussionLarge } from './DiscussionLarge';
import { DiscussionSmall } from './DiscussionSmall';

interface DiscussionCardProps {
  size: 'sm' | 'lg';
  discussion: DiscussionDTO;
  rank?: number;
}

const DiscussionCard = ({ size, discussion, rank }: DiscussionCardProps) => (
  <DiscussionDetailLink asTr={false} discussion={discussion}>
    {size === 'lg' ? 
      <DiscussionLarge discussion={discussion} rank={rank as number} /> 
      : 
      <DiscussionSmall discussion={discussion} />}
  </DiscussionDetailLink>
);

export default DiscussionCard;