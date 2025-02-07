import type { PropsWithChildren, ReactNode } from 'react';

import { vars } from '@/theme/index.css';

import clsx from '../../utils/clsx';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { containerStyle, descriptionStyle, titleStyle } from './index.css';
import { ModalContents } from './ModalContents';
import { ModalFooter } from './ModalFooter';

type ModalType = 'default' | 'error';

export interface ModalProps extends PropsWithChildren {
  type?: ModalType;
  subTitle: string;
  title: string;
  description?: string;
  isOpen: boolean;
  className?: string;
}

export const Modal = ({
  type = 'default',
  subTitle,
  title,
  description,
  isOpen,
  className,
  children,
}: ModalProps) => (
  <Flex
    className={clsx(containerStyle, className)}
    direction='column'
    justify='flex-start'
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
  </Flex>
);

Modal.Footer = ModalFooter;
Modal.Contents = ModalContents;