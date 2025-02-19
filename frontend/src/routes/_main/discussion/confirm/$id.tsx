import { createFileRoute } from '@tanstack/react-router';

import { discussionConfirmQuery } from '@/features/discussion/api/queries';
import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionConfirmPage from '@/pages/DiscussionPage/DiscussionConfirmPage';

const DiscussionConfirm = () => {
  const { confirm } = Route.useLoaderData();
  return (
    <>
      <GlobalNavBar>
        <GlobalNavBar.MyCalendarLink />
      </GlobalNavBar>
      <DiscussionConfirmPage confirm={confirm} />
    </>
  );
};

export const Route = createFileRoute('/_main/discussion/confirm/$id')({
  loader: async ({ params: { id }, context }) => {
    const confirm = await context.queryClient.fetchQuery(discussionConfirmQuery(id));
    return { confirm };
  },
  component: DiscussionConfirm,
});
