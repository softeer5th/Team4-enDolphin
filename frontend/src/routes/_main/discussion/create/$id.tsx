import { createFileRoute } from '@tanstack/react-router';

import { discussionQuery } from '@/features/discussion/api/queries';
import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionCreateFinishPage from '@/pages/DiscussionPage/DiscussionCreateFinishPage';

const DiscussionCreateFinish = () => {
  const { discussion } = Route.useLoaderData();
  return (
    <>
      <GlobalNavBar background='transparent'>
        <GlobalNavBar.MyCalendarLink />
      </GlobalNavBar>
      <DiscussionCreateFinishPage discussion={discussion} />
    </>
  );
};

export const Route = createFileRoute('/_main/discussion/create/$id')({
  loader: async ({ params: { id }, context }) => {
    const discussion = await context.queryClient.fetchQuery(discussionQuery(id));
    return { discussion };
  },
  component: DiscussionCreateFinish,
});
