import { createFileRoute } from '@tanstack/react-router';

import Landing from './@components';

export const Route = createFileRoute('/landing/')({
  component: Landing,
});