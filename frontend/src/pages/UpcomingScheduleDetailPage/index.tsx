import { useParams } from '@tanstack/react-router';

import TimelineScheduleModal from '@/features/timeline-schedule/ui';

import Header from './Header';
import { backdropStyle } from './index.css';

const UpcomingScheduleDetailPage = (candidate: {
  startDateTime: string;
  endDateTime: string;
  selectedParticipantIds?: number[];
}) => {
  const { id } = useParams({ from: '/_main/upcoming-schedule/$id' });
  const [start, end] = [new Date(candidate.startDateTime), new Date(candidate.endDateTime)];

  return (
    <>
      <div className={backdropStyle} />
      <TimelineScheduleModal
        discussionId={Number(id)}
        isConfirmedSchedule={true}
        {...candidate}
      >
        <TimelineScheduleModal.TopBar></TimelineScheduleModal.TopBar>
        <TimelineScheduleModal.Header>
          <Header
            endDateTime={end}
            startDateTime={start}
          />
        </TimelineScheduleModal.Header>
      </TimelineScheduleModal>
    </>
  ); 
};

export default UpcomingScheduleDetailPage;