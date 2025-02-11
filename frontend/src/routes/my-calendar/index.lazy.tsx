import { createLazyFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import MyCalendarPage from '@/pages/MyCalendarPage';

const MyCalendar = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.NewDiscussionLink />
    </GlobalNavBar>
    <MyCalendarPage />
  </>
);

export const Route = createLazyFileRoute('/my-calendar/')({
  component: MyCalendar,
});
