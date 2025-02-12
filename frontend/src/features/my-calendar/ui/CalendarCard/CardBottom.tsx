import { Flex } from '@/components/Flex';
import { GoogleCalendar, Pencil } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import type { CalendarCardProps } from '.';
import { cardBottomStyle } from './index.css';

export const CardBottom = ({
  size,
  onClickEdit,
  onClickGoogle,
}: Pick<CalendarCardProps, 'size' | 'onClickEdit' | 'onClickGoogle'>) => {
  if (size === 'sm' || size === 'md') return null;
  
  return(
    <Flex
      align='flex-end'
      className={cardBottomStyle}
      gap={200}
      height='100%'
      justify='flex-end'
      width='full'
    >
      <GoogleCalendar clickable onClick={onClickGoogle} />
      <Pencil
        clickable
        fill={vars.color.Ref.Netural[600]}
        onClick={onClickEdit}
      />
    </Flex>
  );
};