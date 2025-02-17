import { createLazyFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import CandidateSchedulePage from '@/pages/CandidateSchedulePage';

const CandidateSchedule = () => (
  <>
    <GlobalNavBar></GlobalNavBar>
    <CandidateSchedulePage />
  </>
);

export const Route = createLazyFileRoute('/discussion/candidate/')({
  component: CandidateSchedule,
});
