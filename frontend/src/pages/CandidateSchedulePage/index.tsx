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
  const [start, end] = [new Date(candidate.startDateTime), new Date(candidate.endDateTime)];

  return (
    <>
      <div className={backdropStyle} />
      <TimelineScheduleModal discussionId={Number(id)} {...candidate} >
        <TimelineScheduleModal.TopBar></TimelineScheduleModal.TopBar>
        <TimelineScheduleModal.Header>
          <Header
            adjustCount={candidate.adjustCount}
            discussionId={Number(id)}
            endDateTime={end}
            startDateTime={start}
          />
        </TimelineScheduleModal.Header>
      </TimelineScheduleModal>
    </>
  ); 
};

export default CandidateSchedulePage;