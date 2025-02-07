import { Link } from '@tanstack/react-router';

import Button from '@/components/Button';

export const LoginLink = () => (
  <Button
    as={Link}
    to='/login'
  >
    로그인
  </Button>
);