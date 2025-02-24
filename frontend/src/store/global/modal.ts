import { atom, useAtom } from 'jotai';

import type { ModalInfo, ModalWithoutIsOpen } from '@/hooks/useModal';

export const openAtom = atom(false);
export const modalAtom = atom<ModalWithoutIsOpen | null>(null);

export const useGlobalModal = (): ModalInfo => {
  const [isOpen, setIsOpen] = useAtom(openAtom);
  const [modal, setModal] = useAtom(modalAtom);
  
  const createModal = (props: ModalWithoutIsOpen) => {
    setModal(props);
    setIsOpen(true);
  };
  
  return {
    isOpen,
    modal,
    createModal,
    onModalOpen: () => setIsOpen(true),
    onModalClose: () => setIsOpen(false),
  };
};