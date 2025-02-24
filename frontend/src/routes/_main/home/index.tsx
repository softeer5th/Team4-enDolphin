import { createFileRoute } from '@tanstack/react-router';

import { sharedSchedulesQueryOptions } from '@/features/shared-schedule/api/queryOptions';
import GlobalNavBar from '@/layout/GlobalNavBar';
import HomePage from '@/pages/HomePage';

const Home = () => (
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyCalendarLink />
      <GlobalNavBar.NewDiscussionLink />
    </GlobalNavBar>
    <HomePage />
  </>
);

export const Route = createFileRoute('/_main/home/')({
  loader: async ({
    context: { queryClient },
  }) => {
    queryClient.fetchQuery(sharedSchedulesQueryOptions.upcoming);
    queryClient.fetchQuery(sharedSchedulesQueryOptions.ongoing(1, 6, 'ALL'));
    queryClient.fetchQuery(sharedSchedulesQueryOptions.finished(1, 6, new Date().getFullYear()));
  },
  component: Home,
});
