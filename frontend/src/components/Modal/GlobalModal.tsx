import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useGlobalModal } from '@/store/global/modal';

import { Modal } from '.';
import { backdropStyle } from './index.css';

export const GlobalModal = () => {
  const MODAL_ROOT = document.body;
  const { isOpen, onModalClose, modal } = useGlobalModal();
  const ref = useClickOutside<HTMLDialogElement>(onModalClose);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

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
