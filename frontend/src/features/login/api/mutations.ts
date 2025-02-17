import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import type { JWTRequest } from '../model';
import { loginApi } from '.';

interface JWTMutationProps extends JWTRequest {
  lastPath: string | null;
}

export const useJWTMutation = () => {
  const navigate = useNavigate();
  
  const { mutate } = useMutation({
    mutationFn: ({ code }: JWTMutationProps) => loginApi.getJWT(code),
    onSuccess: ({ accessToken }, { lastPath }) => {
      localStorage.setItem('accessToken', accessToken);
      navigate({
        to: lastPath || '/home',
      });
    },
    onError: () => {
      navigate({
        to: '/login',
      });
    },
  });

  return { loginMutate: mutate };
};