import { createFileRoute, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useJWTMutation } from '@/features/login/api/mutations';
import { getLastRoutePath } from '@/utils/route';

const Redirect = () => {
  const { mutate } = useJWTMutation();
  // TODO: lastPath로 redirect하기
  // const lastPath = getLastRoutePath();
  const params: { code: string } = useParams({ from: '/oauth/redirect/' });

  // TODO: code 없을 때 예외처리
  useEffect(() => {
    mutate({ code: params.code });
  }, [params, mutate]);

  return null;
};

// TODO: loader 또는 getRouteApi 비교해보고 가장 좋은 방법 사용하기
export const Route = createFileRoute('/oauth/redirect/')({
  component: Redirect,
});
