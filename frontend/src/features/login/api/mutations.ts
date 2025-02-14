import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import type { JWTRequest } from '../model';
import { loginApi } from '.';

export const useJWTMutation = () => {
  const navigate = useNavigate();
  
  const { mutate } = useMutation({
    mutationFn: (body: JWTRequest) => loginApi.getJWT(body.code),
    onSuccess: ({ accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
      navigate({
        to: '/home',
      });
    },
    onError: () => {
      navigate({
        to: '/login',
      });
    },
  });

  return { mutate };
};