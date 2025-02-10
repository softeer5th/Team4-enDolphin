import { createLazyFileRoute } from '@tanstack/react-router';

import MyCalendarPage from '@/pages/MyCalendarPage';

export const Route = createLazyFileRoute('/my-calendar/')({
  component: MyCalendarPage,
});