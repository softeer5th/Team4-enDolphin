import { useNavigate } from '@tanstack/react-router';

import { NotificationContext } from '@/components/Notification/NotificationContext';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/error';
import { HTTPError } from '@/utils/error';

import { useSafeContext } from './useSafeContext';

export const useError = () => {
  const notification = useSafeContext(NotificationContext);
  const navigate = useNavigate();
  
  const handleError = (error: unknown) => {
    if (!(error instanceof HTTPError)) {
      notification.addNoti({
        type: 'error',
        title: DEFAULT_ERROR_MESSAGE,
      });
      return;
    }
    
    if (error.isLoginError()) navigate({ to: '/login' });
    else {
      notification.addNoti({
        type: 'error',
        title: error.message,
      });
    }
  };
  
  return { handleError };
};