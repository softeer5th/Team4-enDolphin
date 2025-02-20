import { useLocation, useParams } from '@tanstack/react-router';

import CandidateScheduleDetail from '@/features/candidate-schedule/ui';

import { backdropStyle } from './index.css';

const CandidateSchedulePage = () => {
  const { id } = useParams({ from: '/_main/discussion/candidate/$id' });
  const { state } = useLocation();
  const { candidate } = state ?? {};
  // TODO: candidate가 없을 경우에 대한 예외 처리
  return (
    <>
      <div className={backdropStyle} />
      <CandidateScheduleDetail discussionId={Number(id)} {...candidate!} />
    </>
  ); 
};

export default CandidateSchedulePage;