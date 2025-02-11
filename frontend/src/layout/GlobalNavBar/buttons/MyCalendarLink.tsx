import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';

export const MyCalendarLink = () => (
  <Button
    as={Link}
    size='md'
    style='borderless'
    to='/my-calendar'
    variant='primary'
  >
    내 일정 관리
  </Button>
);
