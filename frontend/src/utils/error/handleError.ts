import { redirect } from '@tanstack/react-router';
import { ZodError } from 'zod';

import { DEFAULT_ERROR_MESSAGE } from '@/constants/error';
import { addNoti } from '@/store/global/notification';
import { HTTPError } from '@/utils/error';

export const handleError = (error: unknown) => {
  if (error instanceof ZodError) {
    // 개발자 디버깅용 콘솔 출력
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }

  if (!(error instanceof HTTPError)) {
    addNoti({ type: 'error', title: DEFAULT_ERROR_MESSAGE });
    return;
  }
    
  if (error.isLoginError()) redirect({ to: '/login' });
  else addNoti({ type: 'error', title: error.message });
};
