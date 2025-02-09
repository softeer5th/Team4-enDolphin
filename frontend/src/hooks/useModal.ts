import { useState } from 'react';

import type { ModalProps } from '@/components/Modal';

type ModalWithoutIsOpen = Omit<ModalProps, 'isOpen'>;

export interface ModalInfo {
  isOpen: boolean;
  modal: ModalWithoutIsOpen | null;
  createModal: (props: ModalWithoutIsOpen) => void;
  onModalOpen: () => void;
  onModalClose: () => void;
}

export const useModal = (): ModalInfo => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<ModalWithoutIsOpen | null>(null);

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