import { useAtom } from 'jotai';
import { createPortal } from 'react-dom';

import { type NotiAtom, notiAtomsAtom } from '@/store/global/notification';
import { fadeInAndOutStyle } from '@/theme/animation.css';

import { Notification } from '.';
import { notificationsStyle } from './index.css';

const Noti = ({ noti }: { noti: NotiAtom }) => {
  const [notification] = useAtom(noti);
  return <Notification className={fadeInAndOutStyle} {...notification} />;
};

export const GlobalNotifications = () => {
  const MODAL_ROOT = document.body;
  const [notifications] = useAtom(notiAtomsAtom);

  return createPortal(
    <div className={notificationsStyle}>
      {notifications
        .map((notification) => 
          <Noti key={`${notification}`} noti={notification} />,
        )}
    </div>
    , MODAL_ROOT);
};