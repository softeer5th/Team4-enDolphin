import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import CandidateSchedulePage from '@/pages/CandidateSchedulePage';

const CandidateSchedule = () => (
  <>
    <GlobalNavBar></GlobalNavBar>
    <CandidateSchedulePage />
  </>
);

export const Route = createFileRoute('/discussion/candidate/$id')({
  component: CandidateSchedule,
});
