import type { ReactNode } from 'react';

import { vars } from '../../theme/index.css';
import clsx from '../../utils/clsx';
import { CircleCheck, TriangleWarning } from '../Icon';
import { Text } from '../Text';
import { containerStyle, contentsStyle } from './index.css';

type NotiType = 'success' | 'error';

export interface NotificationProps {
  type: NotiType;
  title: string;
  description?: string;
  className?: string;
}

export const Notification = ({
  type,
  title,
  description,
  className,
}: NotificationProps) => {
  const typeIconMap: Record<NotiType, ReactNode> = {
    success: <CircleCheck fill={vars.color.Ref.Primary[500]} />,
    error: <TriangleWarning fill={vars.color.Ref.Red[500]} />,
  };

  return (
    <div className={clsx(containerStyle({ type }), className)} role='alert'>
      {typeIconMap[type]}
      <div className={contentsStyle({ style: description ? 'default' : 'noDescription' })}>
        <Text color={vars.color.Ref.Netural[800]} typo='t2'>{title}</Text>
        { description && <Text color={vars.color.Ref.Netural[500]} typo='b2R'>{description}</Text> }
      </div>
    </div>
  );
};