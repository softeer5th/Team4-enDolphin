import { createPortal } from 'react-dom';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useGlobalModal } from '@/store/global/modal';

import { Modal } from '.';
import { backdropStyle } from './index.css';

export const GlobalModal = () => {
  const MODAL_ROOT = document.body;
  const { isOpen, onModalClose, modal } = useGlobalModal();
  const ref = useClickOutside<HTMLDialogElement>(onModalClose);

  if (!modal || !isOpen) return null;
  return createPortal(
    <>
      <Modal
        isOpen={isOpen}
        ref={ref}
        {...modal}
      />
      <div className={backdropStyle} />
    </>
    , MODAL_ROOT);
};
