import { createLazyFileRoute, useLocation } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import CandidateSchedulePage from '@/pages/CandidateSchedulePage';

const CandidateSchedule = () => {
  const { state } = useLocation();
  const { candidate } = state ?? {};
  if (!candidate) return <div>candidate is undefined or null</div>;

  return (
    <>
      <GlobalNavBar></GlobalNavBar>
      <CandidateSchedulePage {...candidate} />
    </>
  ); 
};

export const Route = createLazyFileRoute('/_main/discussion/candidate/$id')({
  component: CandidateSchedule,
});
