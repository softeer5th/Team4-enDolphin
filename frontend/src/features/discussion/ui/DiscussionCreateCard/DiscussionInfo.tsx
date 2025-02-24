import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { 
  formatBarStringToLocaleString, 
  formatMillisecondsToDDay,
  formatMinutesToTimeDuration,
} from '@/utils/date/format';

import type { DiscussionResponse } from '../../model';
import { textStyle } from './index.css';

const DiscussionInfo = ({ discussion }: { discussion: DiscussionResponse }) => (
  <Flex
    direction='column'
    gap={200}
    width='100%'
  >
    <Text color={vars.color.Ref.Primary[500]} typo='t3'>
      마감까지 
      {' '}
      {formatMillisecondsToDDay(discussion.timeLeft)}
      일
    </Text>
    <Text color={vars.color.Ref.Netural[800]} typo='h3'>{discussion.title}</Text>
    <Flex className={textStyle} direction='column'>
      <Text typo='b2R'>
        {formatBarStringToLocaleString(discussion.dateRangeStart)}
        {' '}
        ~ 
        {' '}
        {formatBarStringToLocaleString(discussion.dateRangeEnd)}
      </Text>
      {discussion.location && <Text typo='b2R'>{discussion.location}</Text>}
      <Text typo='b2R'>
        {formatMinutesToTimeDuration(discussion.duration)}
      </Text>
    </Flex>
  </Flex>
);

export default DiscussionInfo;