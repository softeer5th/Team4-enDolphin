import type { ReactNode } from 'react';

import { vars } from '../../theme/index.css';
import { CircleCheck, TriangleWarning } from '../Icon';
import { Text } from '../Text';
import { containerStyle, contentsStyle } from './index.css';

type NotiType = 'succes' | 'error';

interface NotificationProps {
  type: NotiType;
  title: string;
  description?: string;
}

export const Notification = ({
  type,
  title,
  description,
}: NotificationProps) => {
  const typeIconMap: Record<NotiType, ReactNode> = {
    succes: <CircleCheck fill={vars.color.Ref.Primary[500]} />,
    error: <TriangleWarning fill={vars.color.Ref.Red[500]} />,
  };

  return (
    <div className={containerStyle({ type })} role='alert'>
      {typeIconMap[type]}
      <div className={contentsStyle({ style: description ? 'default' : 'noDescription' })}>
        <Text color={vars.color.Ref.Netural[800]} typo='t2'>{title}</Text>
        { description && <Text color={vars.color.Ref.Netural[500]} typo='b2R'>{description}</Text> }
      </div>
    </div>
  );
};