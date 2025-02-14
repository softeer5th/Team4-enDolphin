import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionInvitePage from '@/pages/DiscussionPage/DiscussionInvitePage';

const DiscussionInvite = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyCalendarLink />
      <GlobalNavBar.NewDiscussionLink />
    </GlobalNavBar>
    <DiscussionInvitePage />
  </>
);

export const Route = createFileRoute('/_main/discussion/invite/$id')({
  component: DiscussionInvite,
});
