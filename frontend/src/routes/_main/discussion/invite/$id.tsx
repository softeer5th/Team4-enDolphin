import { createFileRoute, useParams } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionInvitePage from '@/pages/DiscussionPage/DiscussionInvitePage';

const DiscussionInvite = () => {
  const { id } = useParams({ from: '/_main/discussion/invite/$id' });
  return  (
    <>
      <GlobalNavBar>
        <GlobalNavBar.MyCalendarLink />
        <GlobalNavBar.NewDiscussionLink />
      </GlobalNavBar>
      <DiscussionInvitePage discussionId={Number(id)} />
    </>
  );
};

export const Route = createFileRoute('/_main/discussion/invite/$id')({
  component: DiscussionInvite,
});
