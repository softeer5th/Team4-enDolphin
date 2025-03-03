import { Link } from '@tanstack/react-router';

import { Chip } from '@/components/Chip';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import {
  useDiscussionCalendarQuery,
  useDiscussionParticipantsQuery,
} from '@/features/discussion/api/queries';
import type {
  DiscussionDTO,
  DiscussionResponse,
} from '@/features/discussion/model';
import { vars } from '@/theme/index.css';
import { getTimeDiffString, getTimeParts, getTimeRangeString, getYearMonthDay } from '@/utils/date';
import { getDowString } from '@/utils/date/format';

import { ONGOING_SCHEDULE_DETAIL_GC_TIME } from '../../api';
import {
  noRecommendationTextWrapperStyle,
  recommendContainerStyle,
  recommendItemStyle,
} from './recommendedSchedules.css';

const RecommendedSchedules = ({ discussion }: { 
  discussion: DiscussionResponse;
}) => {
  const { participants, isPending: isParticipantsLoading } = 
  useDiscussionParticipantsQuery(discussion.id.toString());
  const { calendar: candidates, isPending: isCandidateLoading } = useDiscussionCalendarQuery(
    discussion.id.toString(), { size: 3 }, ONGOING_SCHEDULE_DETAIL_GC_TIME,
  );

  if (isCandidateLoading || isParticipantsLoading || !candidates || !participants)
    return <div className={recommendContainerStyle} />;
  
  return (
    <Flex
      className={recommendContainerStyle}
      direction='column'
      justify='flex-start'
      width='full'
    >
      <Text typo='t2'>추천 일정</Text>
      {
        candidates.length === 0 ?
          <NoRecommendationText />
          :
          candidates.map((candidate, idx) => (
            <RecommendedScheduleItem
              adjustCount={candidate.usersForAdjust.length}
              candidate={candidate}
              discussionId={discussion.id}
              endDTStr={candidate.endDateTime}
              key={`${JSON.stringify(candidate)}-${idx}`}
              startDTStr={candidate.startDateTime}
            />
          ))
      }
    </Flex>
  ); 
};

const RecommendedScheduleItem = ({ 
  candidate, discussionId, startDTStr, endDTStr, adjustCount,
}: {
  candidate: DiscussionDTO;
  discussionId: number;
  startDTStr: string;
  endDTStr: string;
  adjustCount: number;
}) => {
  const [startDT, endDT] = [new Date(startDTStr), new Date(endDTStr)];
  const [startTime, endTime] = [getTimeParts(startDT), getTimeParts(endDT)];
  const { month, day } = getYearMonthDay(startDT);
  const dow = getDowString(startDT);
  return(
    <Link
      className={recommendItemStyle}
      params={{ id: discussionId.toString() }}
      state={{ candidate: {
        adjustCount: candidate.usersForAdjust.length,
        startDateTime: startDTStr,
        endDateTime: endDTStr,
      } }}
      to={'/discussion/candidate/$id'}
    >
      <Flex direction='column' gap={100}>
        <Text typo='b2M'>{`${month}월 ${day}일 ${dow}요일`}</Text>
        <Text color={vars.color.Ref.Netural[700]} typo='b3R'>
          {`${getTimeRangeString(startTime, endTime)} (${getTimeDiffString(startDT, endDT)})`}
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
    variant='weak'
  >
    {adjustCount > 0 ? `조율 필요 ${adjustCount}` : '모두 가능'}
  </Chip>
);

const NoRecommendationText = () => (
  <div className={noRecommendationTextWrapperStyle}>
    <Text color={vars.color.Ref.Netural[600]} typo='t2'>
      추천 가능한 일정이 없어요
    </Text>
  </div>
);

export default RecommendedSchedules;