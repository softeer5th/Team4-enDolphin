import type { PrimitiveAtom } from 'jotai';
import { atom, getDefaultStore } from 'jotai';

import type { NotificationProps } from '@/components/Notification';

export const notiStore = getDefaultStore();

export type NotiAtom = PrimitiveAtom<NotificationProps>;
export const notiAtomsAtom = atom<NotiAtom[]>([]);

export const addNoti = (props: NotificationProps) => {
  const newNoti = atom<NotificationProps>(props);
  notiStore.set(notiAtomsAtom, (prev) => [...prev, newNoti]);

  setTimeout(() => {
    notiStore.set(notiAtomsAtom, (prev) => prev.filter((noti) => noti !== newNoti));
  }, 3000);
};

export const getNotifications = () => notiStore.get(notiAtomsAtom);