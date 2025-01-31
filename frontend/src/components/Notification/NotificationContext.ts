import { createContext } from 'react';

import type { NotificationWithId } from '../../hooks/useNotification';

interface NotificationContextProps {
  addNoti: (notification: NotificationWithId) => void;
}
  
export const NotificationContext = createContext<NotificationContextProps | null>(null);