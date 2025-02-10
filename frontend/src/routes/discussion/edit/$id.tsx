import { createFileRoute } from '@tanstack/react-router';

import DiscussionEditPage from '@/pages/DiscussionPage/DiscussionEditPage';

export const Route = createFileRoute('/discussion/edit/$id')({
  component: DiscussionEditPage,
});