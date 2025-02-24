import { createFileRoute, useLocation } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import UpcomingScheduleDetailPage from '@/pages/UpcomingScheduleDetailPage';

const UpcomingDetail = () => {
  const { upcomingScheduleDetail: routeState } = useLocation().state;
  if (!routeState) return <div />;

  return (
    <>
      <GlobalNavBar>
        <GlobalNavBar.MyCalendarLink />
        <GlobalNavBar.NewDiscussionLink />
      </GlobalNavBar>
      <UpcomingScheduleDetailPage {...routeState} />
    </>
  ); 
};

export const Route = createFileRoute('/_main/upcoming-schedule/$id')({
  component: UpcomingDetail,
});

