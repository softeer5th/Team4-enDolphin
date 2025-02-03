import type { ReactNode } from 'react';

import { useNotification } from '@/hooks/useNotification';

import { GlobalNotification } from './GlobalNotification';
import { NotificationContext } from './NotificationContext';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { state, addNoti } = useNotification();

  return (
    <NotificationContext.Provider value={{ addNoti }}>
      {state.notifications.length > 0 && <GlobalNotification notifications={state.notifications}/>}
      {children}
    </NotificationContext.Provider>
  );
};