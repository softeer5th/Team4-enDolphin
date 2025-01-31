
import { useCallback, useReducer } from 'react';

import type { NotificationProps } from '../components/Notification';

export type NotificationWithOptionalId = NotificationProps & {
  id?: number;
};

export type NotificationWithId = NotificationProps & {
  id: number;
};

type NotificationState = {
  notifications: NotificationWithId[];
};

export type NotificationAction = { type: 'ADD_NOTIFICATION'; notification: NotificationWithId } 
| { type: 'REMOVE_NOTIFICATION'; id: number };

export const notificationReducer = (state: NotificationState, action: NotificationAction) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      return { notifications: [...state.notifications, action.notification] };
    }
    case 'REMOVE_NOTIFICATION': {
      const newNotifications = state.notifications
        .filter((notification) => notification.id !== action.id);
      return { notifications: newNotifications };
    }
    default:
      return state;
  }
};

export const useNotification = () => {
  const [state, dispatch] = useReducer(notificationReducer, { notifications: [] });

  const addNoti = (notification: NotificationWithOptionalId) => {
    // TODO: 유니크한 id 생성하기. (따닥 이슈)
    const defaultId = notification.id || new Date().getTime();
    
    dispatch({ type: 'ADD_NOTIFICATION', notification: { ...notification, id: defaultId } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', id: defaultId });
    }, 3000);
  };

  const memoizedAddNoti = useCallback(addNoti, []);

  return { state, addNoti: memoizedAddNoti };
};