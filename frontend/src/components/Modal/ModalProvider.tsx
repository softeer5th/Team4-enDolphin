import type { ReactNode } from 'react';

import { useModal } from '@/hooks/useModal';

import { GlobalModal } from './GlobalModal';
import { ModalContext } from './ModalContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, modal, createModal, onModalOpen, onModalClose } = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, modal, createModal, onModalOpen, onModalClose }}>
      {isOpen && modal && <GlobalModal {...modal} />}
      {children}
    </ModalContext.Provider>
  );
};