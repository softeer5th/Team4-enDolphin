import { createPortal } from 'react-dom';

import type { NotificationWithId } from '@/hooks/useNotification';
import { fadeInAndOut } from '@/theme/animation.css';

import { Notification } from '.';
import { notificationsStyle } from './index.css';

export const GlobalNotification = ({ notifications }: { notifications: NotificationWithId[] }) => {
  const MODAL_ROOT = document.body;

  return createPortal(
    <div className={notificationsStyle}>
      {notifications
        .map((noti) => <Notification className={fadeInAndOut} key={noti.id} {...noti} />)}
    </div>
    , MODAL_ROOT);
};