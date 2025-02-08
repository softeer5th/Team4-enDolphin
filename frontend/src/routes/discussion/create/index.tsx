import { createFileRoute } from '@tanstack/react-router';

import DiscussionCreatePage from '@/pages/DiscussionPage/DiscussionCreatePage';

export const Route = createFileRoute('/discussion/create/')({
  component: DiscussionCreatePage,
});

