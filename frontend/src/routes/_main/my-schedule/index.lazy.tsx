import { createLazyFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import MySchedulePage from '@/pages/MySchedulePage';

const MySchedule = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.NewDiscussionLink />
    </GlobalNavBar>
    <MySchedulePage />
  </>
);
export const Route = createLazyFileRoute('/_main/my-schedule/')({
  component: MySchedule,
});