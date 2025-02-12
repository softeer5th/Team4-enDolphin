import { useMutation } from '@tanstack/react-query';
import { useTransition } from 'react';

import Button from '@/components/Button';
import { requestGoogleLoginUrl } from '@/features/login/api';

const LoginPage = () => {
  const [isRedirectPending, startRedirectTransition] = useTransition();
  const googleLogin = useMutation({
    mutationFn: requestGoogleLoginUrl,
    onSuccess: ({ url }) => {
      startRedirectTransition(async () => {
        window.location.href = url;
      });
    },
  });

  const onGoogleLoginButtonClick = async () => {
    googleLogin.mutate();
    // console.log(await requestGoogleLoginUrl());
  };

  return (
    <div>
      <Button onClick={onGoogleLoginButtonClick}>구글로그인</Button>
    </div>
  );
};

export default LoginPage;