import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { getLastRoutePath } from '@/utils/route';

const Redirect = () => {
  const navigate = useNavigate();
  const lastPath = getLastRoutePath();
  useEffect(() => {
    navigate({
      to: lastPath || '/',
      replace: true,
    });
  }, [navigate, lastPath]);

  return <div></div>;
};

export const Route = createLazyFileRoute('/oauth/redirect/')({
  component: Redirect,
});
