import type { ReactNode } from '@tanstack/react-router';

import { Pencil, Plus } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import type { PopoverType } from '../../@types';
import { titleStyle } from './index.css';

export const Title = ({ type }: { type: PopoverType })=>{
  const popOverTypeMap: Record<PopoverType, {
    title: string;
    icon: ReactNode;
  }> = {
    add: {
      title: '일정 추가',
      icon: <Plus stroke={vars.color.Ref.Netural[600]} width={20} />,
    },
    edit: {
      title: '일정 수정',
      icon: <Pencil fill={vars.color.Ref.Netural[600]} width={16} />,
    },
  };

  return(
    <Text
      className={titleStyle}
      color={vars.color.Ref.Netural[600]}
      typo='t3'
    >
      {popOverTypeMap[type].icon}
      {popOverTypeMap[type].title}
    </Text>
  ); 
};