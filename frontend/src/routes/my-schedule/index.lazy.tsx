import { createLazyFileRoute } from '@tanstack/react-router';

const MySchedule = () => <div>My Schedule</div>;

export const Route = createLazyFileRoute('/my-schedule/')({
  component: MySchedule,
});
