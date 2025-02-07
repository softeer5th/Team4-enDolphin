import { createLazyFileRoute } from '@tanstack/react-router';

import MySchedulePage from '@/pages/MySchedulePage';

export const Route = createLazyFileRoute('/_main/my-schedule/')({
  component: MySchedulePage,
});