import { Link } from '@tanstack/react-router';

import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import type {
  DiscussionCalendarResponse,
  DiscussionDTO,
  DiscussionResponse,
} from '@/features/discussion/model';
import type { UserDTO } from '@/features/user/model';
import { vars } from '@/theme/index.css';
import { getHourDiff, getTimeRangeString } from '@/utils/date';
import { formatKoreanDate } from '@/utils/date/format';

import { recommendContainerStyle, recommendItemStyle } from './recommendedSchedules.css';

const RecommendedSchedules = ({ candidates, discussion, participants }: { 
  candidates: DiscussionCalendarResponse['events'];
  discussion: DiscussionResponse;
  participants: UserDTO[];
}) => (
  <Flex direction='column' width='full'>
    <Text className={recommendContainerStyle} typo='t2'>추천 일정</Text>
    {candidates.map((candidate, idx) => (
      <RecommendedScheduleItem 
        adjustCount={candidate.usersForAdjust.length}
        candidate={candidate}
        discussionId={discussion.id}
        endDTStr={candidate.endDateTime}
        key={`${JSON.stringify(candidate)}-${idx}`}
        participants={participants} 
        startDTStr={candidate.startDateTime}
      />
    ))}
  </Flex>
);

const RecommendedScheduleItem = ({ 
  candidate, discussionId, startDTStr, endDTStr, adjustCount, participants,
}: {
  candidate: DiscussionDTO;
  discussionId: number;
  startDTStr: string;
  endDTStr: string;
  adjustCount: number;
  participants: UserDTO[];
}) => {
  const [startDT, endDT] = [new Date(startDTStr), new Date(endDTStr)];
  return(
    <Link
      className={recommendItemStyle}
      params={{ id: discussionId.toString() }}
      state={{ candidate: {
        adjustCount: candidate.usersForAdjust.length,
        startDateTime: startDTStr,
        endDateTime: endDTStr,
        selectedParticipantIds: participants.map(v => v.id),
      } }}
      to={'/discussion/candidate/$id'}
    >
      <Flex direction='column' gap={100}>
        <Text typo='b2M'>{formatKoreanDate(startDT, { year: true })}</Text>
        <Text color={vars.color.Ref.Netural[700]} typo='b3R'>
          {`${getTimeRangeString(startDT, endDT)} (${getHourDiff(startDT, endDT)}시간)`}
        </Text>
      </Flex >
      <AvailableChip adjustCount={adjustCount} />
    </Link>
  ); 
};

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