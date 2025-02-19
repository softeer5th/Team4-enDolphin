import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date/format';

import type { DiscussionDTO } from '../../model';
import DiscussionConfirmButton from '../DiscussionConfirmButton';
import { containerStyle } from './card.css';

// 추후 삭제할 코드가 포함되어 있습니다.
// TODO: 일정 확정 버튼 디테일 페이지로 이동
// eslint-disable-next-line
export const DiscussionSmall = (
  { discussion }: { discussion: DiscussionDTO },
) => {
  const ADJUSTMENT_LENGTH = discussion.usersForAdjust.length;
  const isRecommend = ADJUSTMENT_LENGTH === 0;
  return (
    <Flex
      className={containerStyle({ isRecommend })}
      direction='column'
      gap={300}
      width='100%'
    >
      <DiscussionConfirmButton 
        endDateTime={discussion.endDateTime}
        startDateTime={discussion.startDateTime}
      />
      {isRecommend && <Chip color='blue' size='lg'>추천</Chip>}
      <Flex direction='column' gap={50}>
        <Text color={vars.color.Ref.Netural[600]} typo='b3R'>
          {formatDateToTimeString(new Date(discussion.startDateTime))}
          {' '}
          - 
          {' '}
          {formatDateToTimeString(new Date(discussion.endDateTime))}
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