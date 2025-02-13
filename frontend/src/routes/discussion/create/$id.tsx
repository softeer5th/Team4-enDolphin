import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionCreateFinishPage from '@/pages/DiscussionCreateFinishPage';

const DiscussionCreateFinish = () => (
  <>
    <GlobalNavBar background='transparent'>
      <GlobalNavBar.MyScheduleLink />
    </GlobalNavBar>
    <DiscussionCreateFinishPage />
  </>
);

export const Route = createFileRoute('/discussion/create/$id')({
  component: DiscussionCreateFinish,
});
