import { Flex } from '@/components/Flex';
import { GoogleCalendar, Pencil } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import { cardBottomStyle } from './index.css';
import type { CalendarCardProps } from './type';

export const CardBottom = ({
  size,
  onClickEdit,
}: Pick<CalendarCardProps, 'size' | 'onClickEdit'>) => {
  if (size !== 'lg') return null;
  
  return(
    <Flex
      align='flex-end'
      className={cardBottomStyle}
      gap={200}
      height='100%'
      justify='flex-end'
      width='full'
    >
      <GoogleCalendar />
      <Pencil
        clickable
        fill={vars.color.Ref.Netural[600]}
        onClick={onClickEdit}
      />
    </Flex>
  );
};