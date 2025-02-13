import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionCreateFinishPage from '@/pages/DiscussionCreateFinishPage';

const DiscussionCreateFinish = () => (
  <>
    <GlobalNavBar background='transparent'>
      <GlobalNavBar.MyCalendarLink />
    </GlobalNavBar>
    <DiscussionCreateFinishPage />
  </>
);

export const Route = createFileRoute('/_main/discussion/create/$id')({
  component: DiscussionCreateFinish,
});
