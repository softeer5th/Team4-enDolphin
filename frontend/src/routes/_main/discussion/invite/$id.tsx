import { createFileRoute } from '@tanstack/react-router';

import { invitationQueryOption } from '@/features/discussion/api/queryOptions';
import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionInvitePage from '@/pages/DiscussionPage/DiscussionInvitePage';
import { parseTime } from '@/utils/date';

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
    const now = new Date();
    const mockedInvitation = {
      host: '김태희',
      title: '토론',
      dateRangeStart: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0),
      dateRangeEnd: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0),
      timeRangeStart: { hour: 9, minute: 0, second: 0 },
      timeRangeEnd: { hour: 10, minute: 0, second: 0 },
      duration: 30,
      isFull: false,
      requirePassword: true,
      timeUnlocked: new Date(now.getTime() + 5 * 60 * 1000), // 현재 시간 + 5분
    };
    return { invitation: mockedInvitation };
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
