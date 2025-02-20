import { useParams } from '@tanstack/react-router';

import CandidateScheduleDetail from '@/features/candidate-schedule/ui';

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
      <CandidateScheduleDetail discussionId={Number(id)} {...candidate} />
    </>
  ); 
};

export default CandidateSchedulePage;