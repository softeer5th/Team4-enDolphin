import { createFileRoute } from '@tanstack/react-router';

import { invitationQueryOption } from '@/features/discussion/api/queryOptions';
import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionInvitePage from '@/pages/DiscussionPage/DiscussionInvitePage';

const DiscussionInvite = () => {
  const { invitation } = Route.useLoaderData();
  return  (
    <>
      <GlobalNavBar>
        <GlobalNavBar.MyCalendarLink />
        <GlobalNavBar.NewDiscussionLink />
      </GlobalNavBar>
      <DiscussionInvitePage invitation={invitation} />
    </>
  );
};

export const Route = createFileRoute('/_main/discussion/invite/$id')({
  loader: async ({ params: { id }, context }) => {
    const invitation = await context.queryClient.fetchQuery(invitationQueryOption(Number(id)));
    return { invitation };
  },
  component: DiscussionInvite,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `언제만나 - ${loaderData.invitation.host}님의 초대장`,
      },
      {
        property: 'og:title',
        content: `언제만나 - ${loaderData.invitation.host}님의 초대장`,
      },
      { 
        name: 'description', 
        content: 
        `${loaderData.invitation.title} 일정에 ${loaderData.invitation.host}님이 초대했어요.\n지금 참여해 보세요!🗓️`, 
      },
      { 
        property: 'og:description', 
        content: 
        `${loaderData.invitation.title} 일정에 ${loaderData.invitation.host}님이 초대했어요.\n지금 참여해 보세요!🗓️`, 
      },
      {
        property: 'og:image',
        content: '/images/assets/calendar.webp',
      },
    ],
  }),
});
