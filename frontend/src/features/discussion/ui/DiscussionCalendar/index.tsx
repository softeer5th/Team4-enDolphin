import { Calendar } from '@/components/Calendar';

import { CalendarTable } from './CalendarTable';

const DiscussionCalendar = () => (
  <Calendar>
    <Calendar.Core />
    <CalendarTable />
  </Calendar>
);

export default DiscussionCalendar;