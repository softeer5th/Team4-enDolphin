import { createPortal } from 'react-dom';

import { useClickOutside } from '@/hooks/useClickOutside';

import type { ModalProps } from '.';
import { Modal } from '.';
import { backdropStyle } from './index.css';
import { useModalContext } from './ModalContext';

export const GlobalModal = (props: Omit<ModalProps, 'isOpen'>) => {
  const MODAL_ROOT = document.body;
  const { isOpen, onModalClose } = useModalContext();
  const ref = useClickOutside<HTMLDialogElement>(onModalClose);

  return createPortal(
    <>
      <Modal
        isOpen={isOpen}
        ref={ref}
        {...props}
      />
      <div className={backdropStyle} />
    </>
    , MODAL_ROOT);
};
