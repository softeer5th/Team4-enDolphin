import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useNavigateToCandidate } from '@/hooks/useNavigateToCandidate';
import { vars } from '@/theme/index.css';
import { formatDateToString, formatDateToTimeString } from '@/utils/date/format';

import type { DiscussionDTO } from '../../model';
import {
  tableCellStyle,
  tableCellTextStyle,
  tableRowStyle,
} from './index.css';

const RankAdjustable = ({ users }: { users: DiscussionDTO['usersForAdjust'] }) => {
  const ADJUSTMENT_LENGTH = users.length;
  const isRecommend = ADJUSTMENT_LENGTH === 0;
  const AdjustmentText = () => {
    if (isRecommend) return '모두 가능해요';
    return (
      <>
        <span style={{ color: vars.color.Ref.Primary[500] }}>
          {ADJUSTMENT_LENGTH}
          명
        </span>
        만 조율하면 돼요
      </>
    );
  };
  return (
    <>
      <Text
        className={tableCellTextStyle}
        color={vars.color.Ref.Netural[800]}
        typo='t2'
      >
        <AdjustmentText />
      </Text>
      <Flex gap={200}>
        {!isRecommend && users.map((user) => <Chip color='black' key={user.id}>{user.name}</Chip>)}
      </Flex>
    </>
  );
};
  
export const RankTableRow = (
  { discussion, rank }: { discussion: DiscussionDTO; rank: number },
) => { 
  const { handleNavigateToCandidate } = useNavigateToCandidate(discussion);
  return(
    <Flex
      as='tr'
      className={tableRowStyle}
      key={`${rank}-${discussion.startDateTime}`}
      onClick={handleNavigateToCandidate}
      width='100%'
    >
      <td className={tableCellStyle({ width: 56 })}>
        <Text color={vars.color.Ref.Netural[600]} typo='b3M'>
          {rank + 4}
        </Text>
      </td>
      <td className={tableCellStyle({ width: 'full' })}>
        <RankAdjustable users={discussion.usersForAdjust} />
      </td>
      <td className={tableCellStyle({ width: 158 })}>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {formatDateToString(new Date(discussion.startDateTime))}
        </Text>
      </td>
      <td className={tableCellStyle({ width: 158 })}>        
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {formatDateToTimeString(new Date(discussion.startDateTime))}
          {' '}
          - 
          {' '}
          {formatDateToTimeString(new Date(discussion.endDateTime))}
        </Text>
      </td>
    </Flex>
  ); 
};
  