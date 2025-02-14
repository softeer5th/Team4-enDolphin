import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionCreateFinishPage from '@/pages/DiscussionPage/DiscussionCreateFinishPage';

const DiscussionCreateFinish = () => (
  <>
    <GlobalNavBar background='transparent'>
      <GlobalNavBar.MyCalendarLink />
    </GlobalNavBar>
    <DiscussionCreateFinishPage />
  </>
);

export const Route = createFileRoute('/discussion/create/$id')({
  component: DiscussionCreateFinish,
});
