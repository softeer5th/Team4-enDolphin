
import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { serviceENV } from '@/envconfig';
import {
  useDiscussionQuery,
} from '@/features/discussion/api/queries';
import type { DiscussionResponse } from '@/features/discussion/model';
import { useClipboard } from '@/hooks/useClipboard';
import { vars } from '@/theme/index.css';
import { getDateRangeString } from '@/utils/date';
import { formatMinutesToTimeDuration } from '@/utils/date/format';

import RecommendedSchedules from './RecommendedSchedules';
import {
  containerStyle,
  subTextContainerStyle,
} from './ScheduleDetails.css';

interface ScheduleDetailsProps {
  discussionId: number;
}

// TODO: Date 타입 변환 후 변경사항 적용
const ScheduleContents = ({ discussionId }: ScheduleDetailsProps) => {
  const { discussion } = useDiscussionQuery(discussionId.toString());
  const { handleCopyToClipboard } = useClipboard();
  if (!discussion) return <div className={containerStyle} />;

  return (
    <Flex
      className={containerStyle}
      direction='column'
      gap={800}
      justify='flex-start'
    >
      <ScheduleInfo discussion={discussion} />
      {/* TODO: candidate 가 undefined일 경우의 예외 처리 */}
      <RecommendedSchedules discussion={discussion} />
      <Flex
        gap={200}
        justify='flex-end'
        width='full'
      >
        <Button
          onClick={() => 
            handleCopyToClipboard(`${serviceENV.CLIENT_URL}/discussion/${discussion.id}`)}
          size='xl'
          style='borderless'
        >
          링크 복사
        </Button>
        <Link params={{ id: discussionId.toString() }} to='/discussion/$id'>
          <Button size='xl'>
            자세히 보기
          </Button>
        </Link>
      </Flex>
    </Flex>
  ); 
};

const ScheduleInfo = ({ discussion }: {
  discussion: DiscussionResponse;
}) => {
  const { title, location, duration } = discussion;
  const [rangeStart, rangeEnd] = [
    new Date(discussion.dateRangeStart),
    new Date(discussion.dateRangeEnd),
  ];
  return (
    <Flex
      direction='column'
      gap={200}
      justify='flex-start'
      width='full'
    >
      <Deadline timeLeft={discussion.timeLeft} />
      <Text typo='h3'>{title}</Text>
      <Flex
        className={subTextContainerStyle}
        direction='column'
        gap={200}
      >
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {getDateRangeString(rangeStart, rangeEnd)}
        </Text>
        {location && <Text color={vars.color.Ref.Netural[600]} typo='b2R'>{location}</Text>}
        <Text color={vars.color.Ref.Netural[600]} typo='b2R'>
          {formatMinutesToTimeDuration(duration)}
        </Text>
      </Flex>
    </Flex>
  );
};

// TODO: 계산로직 util로 분리
// TODO: d-day일 경우도 분기 처리 ?
const Deadline = ({ timeLeft }: { timeLeft: number }) => {
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  return (
    <Text color={vars.color.Ref.Red[500]} typo='b3M'>
      {daysLeft >= 0 ? `마감까지 ${daysLeft}일` : `마감일로부터 ${daysLeft}일 지났어요`}
    </Text>
  );
};

export default ScheduleContents;