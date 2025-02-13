import { createLazyFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import HomePage from '@/pages/HomePage';

const Home = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyCalendarLink />
      <GlobalNavBar.NewDiscussionLink />
    </GlobalNavBar>
    <HomePage />
  </>
);
export const Route = createLazyFileRoute('/_main/home/')({
  component: Home,
});
