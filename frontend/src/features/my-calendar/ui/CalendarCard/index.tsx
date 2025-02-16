import { Flex } from '@/components/Flex';

import { CardBottom } from './CardBottom';
import { CardContents } from './CardContents';
import {
  cardBackgroundStyle, 
  cardContainerStyle, 
} from './index.css';
import type { CalendarCardProps } from './type';

export const CalendarCard = ({ 
  id,
  status, 
  size = 'lg', 
  title, 
  startTime, 
  endTime, 
  style, 
}: CalendarCardProps) => {

  const handleClickEdit = () => {
    // console.log(id);
  };

  return (
    <div
      className={cardContainerStyle({ status, size })}
      onClick={handleClickEdit}
      style={style}
    >
      <Flex
        className={cardBackgroundStyle({ size })}
        direction={size === 'lg' ? 'column' : 'row'}
        justify='flex-start'
      >
        <CardContents
          endTime={endTime}
          size={size}
          startTime={startTime}
          status={status}
          title={title}
        />
        <CardBottom onClickEdit={handleClickEdit} size={size} />
      </Flex>
    </div>
  );
};