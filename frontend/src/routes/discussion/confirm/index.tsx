import { createFileRoute } from '@tanstack/react-router';

import GlobalNavBar from '@/layout/GlobalNavBar';
import DiscussionConfirmPage from '@/pages/DiscussionPage/DiscussionConfirmPage';

const DiscussionConfirm = () => 
  <>
    <GlobalNavBar>
      <GlobalNavBar.MyCalendarLink />
    </GlobalNavBar>
    <DiscussionConfirmPage />
  </>;

export const Route = createFileRoute('/discussion/confirm/')({
  component: DiscussionConfirm,
});
