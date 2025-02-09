import { createLazyFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import UpcomingSchedulePage from '@/pages/UpcomingSchedulePage';

const UpcomingSchedule = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyScheduleLink />
      <GlobalNavBar.NewDiscussionLink />
    </GlobalNavBar>
    <UpcomingSchedulePage />
  </>
);
export const Route = createLazyFileRoute('/_main/upcoming-schedule/')({
  component: UpcomingSchedule,
});
