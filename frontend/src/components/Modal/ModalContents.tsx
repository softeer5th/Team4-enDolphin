import type { PropsWithChildren } from 'react';

import clsx from '@/utils/clsx';

import { descriptionStyle } from './index.css';

interface ModalContentsProps extends PropsWithChildren {
  className?: string;
}

export const ModalContents = ({ className, children }: ModalContentsProps) => (
  <div className={clsx(descriptionStyle, className)}>
    {children}
  </div>
);