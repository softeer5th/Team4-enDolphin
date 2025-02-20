import { useParams } from '@tanstack/react-router';

import CandidateScheduleDetail from '@/features/candidate-schedule/ui';

import { backdropStyle } from './index.css';

const CandidateSchedulePage = (candidate: {
  adjustCount: number;
  startDateTime: string;
  endDateTime: string;
  selectedParticipantIds: number[];
}) => {
  const { id } = useParams({ from: '/_main/discussion/candidate/$id' });
  // TODO: candidate가 없을 경우에 대한 예외 처리

  return (
    <>
      <div className={backdropStyle} />
      <CandidateScheduleDetail discussionId={Number(id)} {...candidate} />
    </>
  ); 
};

export default CandidateSchedulePage;