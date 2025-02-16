import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date';

import type { DiscussionDTO } from '../../model';
import { containerStyle } from './card.css';

export const DiscussionSmall = ({ discussion }: { discussion: DiscussionDTO }) => {
  const ADJUSTMENT_LENGTH = discussion.usersForAdjust.length;
  const isRecommend = ADJUSTMENT_LENGTH === 0;
  return (
    <Flex
      className={containerStyle({ isRecommend })}
      direction='column'
      gap={300}
      width='100%'
    >
      {isRecommend && <Chip color='blue' size='lg'>추천</Chip>}
      <Flex direction='column' gap={50}>
        <Text color={vars.color.Ref.Netural[600]} typo='b3R'>
          {formatDateToTimeString(discussion.startDateTime)}
          {' '}
          - 
          {' '}
          {formatDateToTimeString(discussion.endDateTime)}
        </Text>
        {isRecommend ? 
          <Text color={vars.color.Ref.Netural[800]} typo='t1'>모두 가능해요</Text> : 
          <Text color={vars.color.Ref.Netural[800]} typo='t1'>
            {ADJUSTMENT_LENGTH}
            명만
            <br />
            조율하면 돼요
          </Text>}
      </Flex>
      {!isRecommend &&
      <Flex gap={200}>
        {discussion.usersForAdjust.map((user) => 
          <Chip color='black' key={user.id}>{user.name}</Chip>,
        )}
      </Flex>}
    </Flex>
  );
};