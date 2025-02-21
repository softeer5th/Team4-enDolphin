import { useParams } from '@tanstack/react-router';

import TimelineScheduleModal from '@/features/timeline-schedule/ui';

import Header from './Header';
import { backdropStyle } from './index.css';

const CandidateSchedulePage = (candidate: {
  adjustCount: number;
  startDateTime: string;
  endDateTime: string;
  selectedParticipantIds?: number[];
}) => {
  const { id } = useParams({ from: '/_main/discussion/candidate/$id' });

  return (
    <>
      <div className={backdropStyle} />
      <TimelineScheduleModal
        discussionId={Number(id)}
        {...candidate}
        isConfirmedSchedule={false}
      >
        <TimelineScheduleModal.TopBar></TimelineScheduleModal.TopBar>
        <TimelineScheduleModal.Header>
          <Header
            adjustCount={candidate.adjustCount}
            discussionId={Number(id)}
            endDateTime={candidate.endDateTime}
            startDateTime={candidate.startDateTime}
          />
        </TimelineScheduleModal.Header>
      </TimelineScheduleModal>
    </>
  ); 
};

export default CandidateSchedulePage;