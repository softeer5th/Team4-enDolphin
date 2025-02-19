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

import { recommendContainerStyle, recommendItemStyle } from './recommendedSchedules.css';

const RecommendedSchedules = ({ candidates, discussion }: { 
  candidates: DiscussionCalendarResponse['events'];
  discussion: DiscussionResponse;
}) => (
  <Flex direction='column' width='full'>
    <Text className={recommendContainerStyle} typo='t2'>추천 일정</Text>
    {candidates.map((candidate, idx) => (
      <RecommendedScheduleItem 
        candidate={candidate}
        discussion={discussion}
        key={`${JSON.stringify(candidate)}-${idx}`} 
      />
    ))}
  </Flex>
);

const RecommendedScheduleItem = ({ candidate, discussion }: {
  candidate: DiscussionDTO;
  discussion: DiscussionResponse;
}) => (
  <Link
    params={{ id: discussion.id.toString() }}
    state={{ candidate: {
      adjustCount: candidate.usersForAdjust.length,
      startDateTime: new Date(discussion.dateRangeStart),
      endDateTime: new Date(discussion.dateRangeEnd),
      selectedParticipantIds: [1],
    } }}
    to={'/discussion/candidate/$id'}
  >
    <Flex
      align='center'
      className={recommendItemStyle}
      justify='space-between'
      width='full'
    >
      <Flex direction='column' gap={100}>
        <Text typo='b2M'>12월 11일 목요일</Text>
        <Text color={vars.color.Ref.Netural[700]} typo='b3R'>오전 11시 ~ 오후 2시 (3시간)</Text>
      </Flex >
      <Chip
        color='blue'
        radius='max'
        size='md'
        style='weak'
      >
        모두 가능
      </Chip>
    </Flex>
  </Link>
);

export default RecommendedSchedules;