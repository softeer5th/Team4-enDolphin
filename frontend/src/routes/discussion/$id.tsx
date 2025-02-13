import { createFileRoute } from '@tanstack/react-router';

import DiscussionPage from '@/pages/DiscussionPage';

export const Route = createFileRoute('/discussion/$id')({
  component: DiscussionPage,
});
