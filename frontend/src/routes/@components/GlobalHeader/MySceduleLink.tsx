import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';

const MyScheduleLink = () => (
  // TODO: 내 일정 페이지로 라우팅
  <Link to='/'>
    <Button
      size='md'
      style='borderless'
      type='primary'
    >
      내 일정 관리
    </Button>
  </Link>
);

export default MyScheduleLink;