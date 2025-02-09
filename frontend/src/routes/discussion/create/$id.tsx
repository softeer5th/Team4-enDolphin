import { createFileRoute } from '@tanstack/react-router';

import DiscussionCreateFinishPage from '../@components';

export const Route = createFileRoute('/discussion/create/$id')({
  component: DiscussionCreateFinishPage,
});