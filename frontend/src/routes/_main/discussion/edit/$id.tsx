import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionEditPage from '@/pages/DiscussionPage/DiscussionEditPage';

const DiscussionEdit = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyCalendarLink />
    </GlobalNavBar>
    <DiscussionEditPage />
  </>
);

export const Route = createFileRoute('/_main/discussion/edit/$id')({
  component: DiscussionEdit,
});
