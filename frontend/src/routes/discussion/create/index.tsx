import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionCreatePage from '@/pages/DiscussionPage/DiscussionCreatePage';

const DiscussionCreate = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyScheduleLink />
    </GlobalNavBar>
    <DiscussionCreatePage />
  </>
);

export const Route = createFileRoute('/discussion/create/')({
  component: DiscussionCreate,
});
