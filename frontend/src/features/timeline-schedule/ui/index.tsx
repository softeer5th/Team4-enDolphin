import { useCanGoBack, useRouter } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';
import { Close } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import { useCandidateDetailQuery } from '../api/queries';
import type { CandidateDetailResponse, Participant } from '../model';
import { 
  closeButtonStyle,
  containerStyle,
  contentContainerStyle,
  headerStyle,
  topBarStyle,
} from './index.css';
import TimelineContent from './TimelineContent';
import { splitParticipantsBySelection } from './timelineHelper';

// TODO: 라우팅 param 정의 위치 옮기기
interface TimelineScheduleModalProps extends PropsWithChildren {
  discussionId: number;
  startDateTime: string;
  endDateTime: string;
  selectedParticipantIds?: number[];
}

const TimelineScheduleModal = ({ 
  discussionId, startDateTime, endDateTime, selectedParticipantIds, children,
}: TimelineScheduleModalProps) => {
  const { data, isPending } = useCandidateDetailQuery(
    discussionId, startDateTime, endDateTime, selectedParticipantIds,
  );
  if (isPending || !data) return <div className={containerStyle} />;
  const { selectedParticipants, ignoredParticipants } = splitParticipantsBySelection(
    data.participants, 
    selectedParticipantIds,
  );

  return (
    <Flex className={containerStyle} direction='column'>
      {children}
      <Content
        {...data}
        endDateTime={new Date(endDateTime)}
        ignoredParticipants={ignoredParticipants}
        selectedParticipants={selectedParticipants}
        startDateTime={new Date(startDateTime)}
      />
    </Flex>
  );
};

const TopBar = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const handleGoBack = () => canGoBack && router.history.back();

  return (
    <Flex
      align='center'
      className={topBarStyle}
      justify='flex-start'
    >
      {children}
      <Close
        className={closeButtonStyle}
        clickable
        fill={vars.color.Ref.Netural[500]}
        onClick={handleGoBack}
        width={24}
      />
    </Flex>
  ); 
};

interface ContentProps extends CandidateDetailResponse {
  selectedParticipants: Participant[];
  ignoredParticipants: Participant[];
}

const Content = ({ 
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
    <TimelineContent
      conflictEnd={props.endDateTime}
      conflictStart={props.startDateTime} 
      ignoredParticipants={ignoredParticipants}
      selectedParticipants={selectedParticipants}
    />
  </Flex>
);

const Header = ({ children }: PropsWithChildren) => (
  <div className={headerStyle}>
    {children}
  </div>
);

TimelineScheduleModal.TopBar = TopBar;
TimelineScheduleModal.Header = Header;

export default TimelineScheduleModal;
