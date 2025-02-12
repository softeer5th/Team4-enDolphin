import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';

import { getLastRoutePath } from '@/utils/route';

const Redirect = () => {
  const navigate = useNavigate();
  const lastPath = getLastRoutePath();
  navigate({
    to: lastPath || '/',
    replace: true,
  });

  return <div></div>;
};

export const Route = createLazyFileRoute('/oauth/redirect/')({
  component: Redirect,
});
