import { createFileRoute, redirect } from '@tanstack/react-router';

import { isLogin } from '@/utils/auth';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: isLogin() ? '/home' : '/landing',
    });
  },
});
