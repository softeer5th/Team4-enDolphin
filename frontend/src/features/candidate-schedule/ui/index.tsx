import { Flex } from '@/components/Flex';
import { Close } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import type { CandidateScheduleGetResponse, Participant } from '../model';
import { mockedCandidateScheduleGetResponse } from '../model';
import Header from './Header';
import { containerStyle, contentContainerStyle, topBarStyle } from './index.css';
import TimelineContent from './TimelineContent';
import { splitParticipantsBySelection } from './timelineHelper';

// TODO: 라우팅 param 정의 위치 옮기기
interface CandidateScheduleDetailParams {
  adjustCount: number;
  startTime: Date;
  endTime: Date;
}

const CandidateScheduleDetail = () => {
  const mockData = mockedCandidateScheduleGetResponse;
  const mockRouteParams = {
    adjustCount: 1,
    startTime: mockData.startDateTime,
    endTime: mockData.endDateTime,
    selectedParticipantIds: [1, 3, 4, 5, 6, 7, 8],
  };
  const { selectedParticipants, ignoredParticipants } = splitParticipantsBySelection(
    mockData.participants, 
    mockRouteParams.selectedParticipantIds,
  );

  return (
    <Flex className={containerStyle} direction='column'>
      <TopBar />
      <Content
        ignoredParticipants={ignoredParticipants}
        selectedParticipants={selectedParticipants}
        {...mockData}
        {...mockRouteParams}
      />
    </Flex>
  );
};

const TopBar = () => (
  <Flex
    align='center'
    className={topBarStyle}
    justify='flex-end'
  >
    <Close
      clickable
      fill={vars.color.Ref.Netural[500]}
      width={24}
    />
  </Flex>
);

interface ContentProps extends CandidateScheduleGetResponse, CandidateScheduleDetailParams {
  selectedParticipants: Participant[];
  ignoredParticipants: Participant[];
}

const Content = ({ selectedParticipants, ignoredParticipants, ...props }: ContentProps) => (
  <Flex
    className={contentContainerStyle}
    direction='column'
    justify='flex-start'
    width='full'
  >
    <Header {...props} />
    <TimelineContent
      conflictEnd={props.endTime}
      conflictStart={props.startTime} 
      ignoredParticipants={ignoredParticipants}
      participants={props.participants}
      selectedParticipants={selectedParticipants}
    />
  </Flex>
);

export default CandidateScheduleDetail;
