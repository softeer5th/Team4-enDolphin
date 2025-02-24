import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionCreatePage from '@/pages/DiscussionPage/DiscussionCreatePage';

const DiscussionCreate = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyCalendarLink />
    </GlobalNavBar>
    <DiscussionCreatePage />
  </>
);

export const Route = createFileRoute('/_main/discussion/create/')({
  component: DiscussionCreate,
});
