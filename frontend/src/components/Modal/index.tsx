import clsx from '@utils/clsx';
import type { ForwardRefExoticComponent, ReactNode, RefAttributes  } from 'react';
import { forwardRef } from 'react';

import { vars } from '@/theme/index.css';

import { Text } from '../Text';
import { containerStyle, descriptionStyle, titleStyle } from './index.css';
import { ModalContents } from './ModalContents';
import { ModalFooter } from './ModalFooter';

type ModalType = 'default' | 'error';

export interface ModalProps {
  type?: ModalType;
  subTitle: string;
  title: string;
  description?: string;
  isOpen: boolean;
  className?: string;
  children?: ReactNode;
}

interface ModalComponent 
  extends ForwardRefExoticComponent<ModalProps & RefAttributes<HTMLDialogElement>> {
  Footer: typeof ModalFooter;
  Contents: typeof ModalContents;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(({
  type = 'default',
  subTitle,
  title,
  description,
  className,
  isOpen,
  children,
}, ref) => (
  <dialog
    className={clsx(containerStyle, className)}
    open={isOpen}
    ref={ref}
  >
    <Text 
      color={type === 'default' ? vars.color.Ref.Primary[500] : vars.color.Ref.Red[500]}
      typo='t2'
    >
      {subTitle}
    </Text>
    <Text
      className={titleStyle}
      color={vars.color.Ref.Netural[800]}
      typo='h3'
    >
      {title}
    </Text>
    {description && 
    <Text
      className={descriptionStyle}
      color={type === 'default' ? vars.color.Ref.Netural[500] : vars.color.Ref.Netural[800]}
      typo='b2R'
    >
      {description}
    </Text>}
    {children}
  </dialog>
)) as ModalComponent;

Modal.displayName = 'Modal';

Modal.Footer = ModalFooter;
Modal.Contents = ModalContents;