import { createContext } from 'react';

import type { NotificationWithOptionalId } from '../../hooks/useNotification';

interface NotificationContextProps {
  addNoti: (notification: NotificationWithOptionalId) => void;
}
  
export const NotificationContext = createContext<NotificationContextProps | null>(null);