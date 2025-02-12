import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionEditPage from '@/pages/DiscussionPage/DiscussionEditPage';

const DiscussionEdit = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyScheduleLink />
    </GlobalNavBar>
    <DiscussionEditPage />
  </>
);

export const Route = createFileRoute('/discussion/edit/$id')({
  component: DiscussionEdit,
});
