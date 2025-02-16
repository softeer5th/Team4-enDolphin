import { Flex } from '@/components/Flex';

import { CardBottom } from './CardBottom';
import { CardContents } from './CardContents';
import { cardBackgroundStyle, cardContainerStyle } from './index.css';
import type { CalendarCardProps } from './type';

export const Card = ({
  endTime,
  handleClickEdit,
  size,
  startTime,
  status,
  style,
  title,
  calendarId,
}: CalendarCardProps & { handleClickEdit: () => void }) => (
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
        calendarId={calendarId}
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
  