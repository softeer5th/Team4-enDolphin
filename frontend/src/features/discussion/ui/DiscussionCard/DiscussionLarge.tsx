import { Flex } from '@/components/Flex';
import { CalendarCheck, Clock, UserTwo } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { formatDateToString, formatDateToTimeString } from '@/utils/date/format';

import type { DiscussionDTO } from '../../model';
import { largeContainerStyle, rankContainerStyle, textStyle } from './card.css';

const formatUserListToString = (users: DiscussionDTO['usersForAdjust']) => {
  const ADJUSTMENT_LENGTH = users.length;
  if (ADJUSTMENT_LENGTH === 0) return '조율이 필요하지 않아요';

  const userNameList = users.map((user) => user.name).slice(0, 3);
  const userNames = userNameList.join(', ');

  if (ADJUSTMENT_LENGTH <= 3) return userNames;
  return `${userNames} 외 ${ADJUSTMENT_LENGTH - userNameList.length}명`;
};

const DiscussionContents = (
  { discussion }: { discussion: DiscussionDTO },
) => (
  <Flex direction='column' gap={200}>
    <Text
      className={textStyle}
      color={vars.color.Ref.Netural[600]}
      typo='b2R'
    >
      <UserTwo width={16} />
      {formatUserListToString(discussion.usersForAdjust)}
    </Text>
    <Text
      className={textStyle}
      color={vars.color.Ref.Netural[600]}
      typo='b2R'
    >
      <CalendarCheck width={16} />
      {formatDateToString(new Date(discussion.startDateTime))}
    </Text>
    <Text
      className={textStyle}
      color={vars.color.Ref.Netural[600]}
      typo='b2R'
    >
      <Clock color={vars.color.Ref.Netural[400]} width={16} />
      {formatDateToTimeString(new Date(discussion.startDateTime))}
      {' '}
      - 
      {' '}
      {formatDateToTimeString(new Date(discussion.endDateTime))}
    </Text>
  </Flex>
);

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
        <Flex 
          align='center'
          className={rankContainerStyle({ rank: rank === 1 ? 'first' : 'default' })}
          height={32}
          width={32}
        >
          <Text typo='t2'>{rank}</Text>
        </Flex>
        {isRecommend ? 
          <Text color={vars.color.Ref.Netural[800]} typo='t1'>모두 가능해요</Text> : 
          <Text color={vars.color.Ref.Netural[800]} typo='t1'>
            {ADJUSTMENT_LENGTH}
            명만 조율하면 돼요
          </Text>}
      </Flex>
      <DiscussionContents discussion={discussion} />
    </Flex>
  );
};