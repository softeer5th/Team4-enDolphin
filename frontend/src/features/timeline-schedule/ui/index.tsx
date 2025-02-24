import { useCanGoBack, useRouter } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';
import { Close } from '@/components/Icon';
import { useClickOutside } from '@/hooks/useClickOutside';
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
import { TimelineContext, useTimelineContext } from './TimelineContext';
import { splitParticipantsBySelection } from './timelineHelper';

// TODO: context로 옮길 수 있는 prop들 찾아서 옮기기
interface TimelineScheduleModalProps extends PropsWithChildren {
  discussionId: number;
  startDateTime: string;
  endDateTime: string;
  selectedParticipantIds?: number[];
  isConfirmedSchedule: boolean;
}

const TimelineScheduleModal = ({ 
  discussionId, startDateTime, endDateTime, selectedParticipantIds, children, isConfirmedSchedule,
}: TimelineScheduleModalProps) => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const handleGoBack = () => canGoBack && router.history.back();
  const notClickableRef = useClickOutside<HTMLDivElement>(handleGoBack);

  const { data, isPending } = useCandidateDetailQuery(
    discussionId, startDateTime, endDateTime, selectedParticipantIds,
  );

  if (isPending || !data) return <div className={containerStyle} />;
  const { checkedParticipants, uncheckedParticipants } = splitParticipantsBySelection(
    data.participants,
    selectedParticipantIds,
  );

  return (
    <TimelineContext.Provider value={{ isConfirmedSchedule, handleGoBack }}>
      <div
        className={containerStyle}
        ref={notClickableRef}
      >
        {children}
        <Content
          {...data}
          checkedParticipants={checkedParticipants}
          uncheckedParticipants={uncheckedParticipants}
        />
      </div>
    </TimelineContext.Provider>
  );
};

const TopBar = ({ children }: PropsWithChildren) =>{
  const { handleGoBack } = useTimelineContext();
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
  checkedParticipants: Participant[];
  uncheckedParticipants: Participant[];
}

const Content = ({ 
  checkedParticipants,
  uncheckedParticipants,
  ...props 
}: ContentProps) => (
  <Flex
    className={contentContainerStyle}
    direction='column'
    justify='flex-start'
    width='full'
  >
    <TimelineContent
      checkedParticipants={checkedParticipants}
      conflictEnd={props.endDateTime} 
      conflictStart={props.startDateTime}
      uncheckedParticipants={uncheckedParticipants}
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