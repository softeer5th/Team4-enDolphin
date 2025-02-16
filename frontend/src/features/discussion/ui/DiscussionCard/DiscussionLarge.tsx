import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date';
import { formatDateToString } from '@/utils/date/format';

import type { DiscussionDTO } from '../../model';
import { largeContainerStyle } from './card.css';

const formatUserListToString = (users: DiscussionDTO['usersForAdjust']) => {
  const ADJUSTMENT_LENGTH = users.length;
  if (ADJUSTMENT_LENGTH === 0) return '조율이 필요하지 않아요';

  const userNames = users.map((user) => user.name).join(' · ');
  return `${userNames} 외 ${ADJUSTMENT_LENGTH}명`;
};

export const DiscussionLarge = (
  { discussion, rank }: { discussion: DiscussionDTO; rank: number },
) => {
  const ADJUSTMENT_LENGTH = discussion.usersForAdjust.length;
  const isRecommend = ADJUSTMENT_LENGTH === 0;
  return (
    <Flex
      className={largeContainerStyle}
      direction='column'
      gap={800}
      width='100%'
    >
      <Flex direction='column' gap={300}>
        <div>{rank}</div>
        {isRecommend ? 
          <Text color={vars.color.Ref.Netural[800]} typo='t1'>모두 가능해요</Text> : 
          <Text color={vars.color.Ref.Netural[800]} typo='t1'>
            {ADJUSTMENT_LENGTH}
            명만 조율하면 돼요
          </Text>}
      </Flex>
      <Flex direction='column' gap={200}>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {formatUserListToString(discussion.usersForAdjust)}
        </Text>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {formatDateToString(discussion.startDateTime)}
        </Text>
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {formatDateToTimeString(discussion.startDateTime)}
          {' '}
          - 
          {' '}
          {formatDateToTimeString(discussion.endDateTime)}
        </Text>
      </Flex>
    </Flex>
  );
};