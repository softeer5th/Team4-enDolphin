import { useCanGoBack, useLocation, useRouter } from '@tanstack/react-router';

import { Flex } from '@/components/Flex';
import { Close } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import { useCandidateDetailQuery } from '../api/queries';
import type { CandidateDetailResponse, Participant } from '../model';
import Header from './Header';
import { containerStyle, contentContainerStyle, topBarStyle } from './index.css';
import TimelineContent from './TimelineContent';
import { splitParticipantsBySelection } from './timelineHelper';

// TODO: 라우팅 param 정의 위치 옮기기
interface CandidateScheduleDetailProps {
  adjustCount: number;
  discussionId: number;
  startDateTime: string;
  endDateTime: string;
  selectedParticipantIds: number[];
}

const CandidateScheduleDetail = ({ 
  adjustCount, discussionId, startDateTime, endDateTime, selectedParticipantIds,
}: CandidateScheduleDetailProps) => {
  const { data, isPending } = useCandidateDetailQuery(
    discussionId, startDateTime, endDateTime, selectedParticipantIds,
  );
  if (isPending) return <div>Pending...</div>;
  if (!data) return <div>data is undefined or null</div>;
  const { selectedParticipants, ignoredParticipants } = splitParticipantsBySelection(
    data.participants, 
    selectedParticipantIds,
  );

  return (
    <Flex className={containerStyle} direction='column'>
      <TopBar />
      <Content
        {...data}
        adjustCount={adjustCount}
        ignoredParticipants={ignoredParticipants}
        selectedParticipants={selectedParticipants}
      />
    </Flex>
  );
};

const TopBar = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const handleGoBack = () => canGoBack && router.history.back();

  return (
    <Flex
      align='center'
      className={topBarStyle}
      justify='flex-end'
    >
      <Close
        clickable
        fill={vars.color.Ref.Netural[500]}
        onClick={handleGoBack}
        width={24}
      />
    </Flex>
  ); 
};

interface ContentProps extends CandidateDetailResponse {
  adjustCount: number;
  selectedParticipants: Participant[];
  ignoredParticipants: Participant[];
}

const Content = ({ 
  adjustCount,
  selectedParticipants,
  ignoredParticipants,
  ...props 
}: ContentProps) => (
  <Flex
    className={contentContainerStyle}
    direction='column'
    justify='flex-start'
    width='full'
  >
    <Header adjustCount={adjustCount} {...props} />
    <TimelineContent
      conflictEnd={props.endDateTime}
      conflictStart={props.startDateTime} 
      ignoredParticipants={ignoredParticipants}
      selectedParticipants={selectedParticipants}
    />
  </Flex>
);

export default CandidateScheduleDetail;
