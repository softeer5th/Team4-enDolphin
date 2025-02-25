import { Flex } from '@/components/Flex';
import { useNavigateToCandidate } from '@/hooks/useNavigateToCandidate';

import type { DiscussionDTO } from '../../model';
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
    <Flex onClick={handleNavigateToCandidate} width='full'>
      {size === 'lg' ? 
        <DiscussionLarge discussion={discussion} rank={rank as number} /> 
        : 
        <DiscussionSmall discussion={discussion} />}
    </Flex>
  ); 
};

export default DiscussionCard;