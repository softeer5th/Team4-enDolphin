import { Link } from '@tanstack/react-router';

import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import type {
  DiscussionCalendarResponse,
  DiscussionDTO,
  DiscussionResponse,
} from '@/features/discussion/model';
import { vars } from '@/theme/index.css';
import { getHourDiff, getTimeRangeString } from '@/utils/date';
import { formatKoreanDate } from '@/utils/date/format';

import { recommendContainerStyle, recommendItemStyle } from './recommendedSchedules.css';

const RecommendedSchedules = ({ candidates, discussion }: { 
  candidates: DiscussionCalendarResponse['events'];
  discussion: DiscussionResponse;
}) => (
  <Flex direction='column' width='full'>
    <Text className={recommendContainerStyle} typo='t2'>추천 일정</Text>
    {candidates.map((candidate, idx) => (
      <RecommendedScheduleItem 
        adjustCount={candidate.usersForAdjust.length}
        candidate={candidate}
        discussionId={discussion.id}
        end={new Date(candidate.endDateTime)}
        key={`${JSON.stringify(candidate)}-${idx}`}
        start={new Date(candidate.startDateTime)} 
      />
    ))}
  </Flex>
);

const RecommendedScheduleItem = ({ 
  candidate, discussionId, start, end, adjustCount, 
}: {
  candidate: DiscussionDTO;
  discussionId: number;
  start: Date;
  end: Date;
  adjustCount: number;
}) => (
  <Link
    className={recommendItemStyle}
    params={{ id: discussionId.toString() }}
    state={{ candidate: {
      adjustCount: candidate.usersForAdjust.length,
      startDateTime: start,
      endDateTime: end,
      selectedParticipantIds: [1],
    } }}
    to={'/discussion/candidate/$id'}
  >
    <Flex direction='column' gap={100}>
      <Text typo='b2M'>{formatKoreanDate(start, { year: true })}</Text>
      <Text color={vars.color.Ref.Netural[700]} typo='b3R'>
        {`${getTimeRangeString(start, end)} (${getHourDiff(start, end)}시간)`}
      </Text>
    </Flex >
    <AvailableChip adjustCount={adjustCount} />
  </Link>
);

const AvailableChip = ({ adjustCount }: { adjustCount: number }) => (
  <Chip
    color={adjustCount > 0 ? 'red' : 'blue'}
    radius='max'
    size='md'
    style='weak'
  >
    {adjustCount > 0 ? `조율 필요 ${adjustCount}` : '모두 가능'}
  </Chip>
);

export default RecommendedSchedules;