import { createFileRoute } from '@tanstack/react-router';

import DiscussionCreateFinishPage from '@/pages/DiscussionCreateFinishPage';

export const Route = createFileRoute('/discussion/create/$id')({
  component: DiscussionCreateFinishPage,
});