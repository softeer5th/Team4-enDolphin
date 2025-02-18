import type { PropsWithChildren } from 'react';

import { vars } from '@/theme/index.css';

import { CalendarCheck, Clock, PinLocation, UserTwo } from '../Icon';
import { Text } from '../Text';
import { badgeStyle } from './index.css';

interface BadgeProps extends PropsWithChildren {
  iconType?: 'date' | 'time' | 'location' | 'person' | 'none';
}

/**
 * @description Badge 컴포넌트.
 *
 * @param icon - Badge 좌측에 포함될 아이콘.
 * @param children - Badge의 내용.
 */
export const Badge = ({ 
  iconType = 'none',
  children, 
}: BadgeProps) => (
  <div className={badgeStyle}>
    {getIcon(iconType)}
    <Text color={vars.color.Ref.Netural[700]} typo='b3R'>{children}</Text>
  </div>
);

const ICON_MAPPING = {
  date: CalendarCheck,
  time: Clock,
  location: PinLocation,
  person: UserTwo,
  none: null,
} as const;

const getIcon = (iconType: BadgeProps['iconType']) => {
  const WIDTH = 16;
  const COLOR = vars.color.Ref.Netural[500];
  const IconComponent = ICON_MAPPING[iconType || 'none'];
  return IconComponent ? <IconComponent fill={COLOR} width={WIDTH} /> : null;
};
