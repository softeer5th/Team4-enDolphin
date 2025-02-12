import type { Dispatch, SetStateAction } from 'react';

import { isSaturday } from '@/utils/date';
import { calcPositionByDate } from '@/utils/date/position';

import type { PopoverType } from '../../model';
import { FormProvider } from './FormProvider';
import { containerStyle } from './index.css';
import { PopoverButton } from './PopoverButton';
import { PopoverForm } from './PopoverForm';
import { Title } from './Title';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface SchedulePopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: PopoverType;
  startDate: Date | null;
  endDate: Date | null;

  // TODO: API 연결 후 삭제
  cards: DateRange[];
  setCards: Dispatch<SetStateAction<DateRange[]>>;
}

export const SchedulePopover = (
  { isOpen, setIsOpen, type, startDate, endDate, setCards }: SchedulePopoverProps,
) => {
  if (!isOpen) return null;
  const { x: sx, y: sy } = calcPositionByDate(startDate);

  const handleClickSave = () => {
    setCards((prev: DateRange[]) => [...prev, { startDate, endDate }]);
    setIsOpen(false);
  };

  const handleClickDelete = () => {
    // do something
  };

  return(
    <dialog
      className={containerStyle}
      open={isOpen}
      style={{
        position: 'absolute',
        left: isSaturday(startDate) 
          ? `calc((100% - 72px) / 7 * ${sx - 1})` : `calc((100% - 72px) / 7 * ${sx + 1})`,
        top: 16 + sy,
      }}
    >
      <FormProvider initialValues={{}}>
        <Title type={type} />
        <PopoverForm endDate={endDate} startDate={startDate} />
        <PopoverButton
          onClickDelete={handleClickDelete}
          onClickSave={handleClickSave}
          type={type}
        />
      </FormProvider>
    </dialog>
  ); 
};