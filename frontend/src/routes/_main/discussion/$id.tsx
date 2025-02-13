import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionPage from '@/pages/DiscussionPage';

const Discussion = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyCalendarLink />
    </GlobalNavBar>
    <DiscussionPage />
  </>
);

export const Route = createFileRoute('/_main/discussion/$id')({
  component: Discussion,
});
