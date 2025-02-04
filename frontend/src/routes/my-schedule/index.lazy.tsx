import { createLazyFileRoute } from '@tanstack/react-router';

import MySchedule from './@components';

export const Route = createLazyFileRoute('/my-schedule/')({
  component: MySchedule,
});
