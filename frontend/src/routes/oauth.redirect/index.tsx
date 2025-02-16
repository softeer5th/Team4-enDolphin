import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useJWTMutation } from '@/features/login/api/mutations';
import { getLastRoutePath } from '@/utils/route';

const Redirect = () => {
  const { loginMutate, isPending } = useJWTMutation();
  const lastPath = getLastRoutePath();
  const params: { code: string } = useSearch({ from: '/oauth/redirect/' });
  const { code } = params;

  useEffect(() => {
    if (code && !isPending) {
      loginMutate({ code, lastPath });
    }
  }, [code, loginMutate, isPending, lastPath]);

  return null;
};

export const Route = createFileRoute('/oauth/redirect/')({
  component: Redirect,
});
