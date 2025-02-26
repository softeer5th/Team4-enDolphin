import Button from '@/components/Button';
import { Flex } from '@/components/Flex';

import { useSchedulePopover } from '../../api/hooks';
import { buttonStyle } from './index.css';
import { usePopoverFormContext } from './PopoverContext';
import type { SchedulePopoverBaseProps } from './type';

export const PopoverButton = ({ type, setIsOpen, reset, scheduleId }: SchedulePopoverBaseProps)=> {
  const { valuesRef, handleSubmit } = usePopoverFormContext();
  const { handleClickCreate, handleClickEdit, handleClickDelete } = useSchedulePopover({
    setIsOpen,
    reset,
    scheduleId,
    valuesRef,
  });

  return(
    type === 'add' ? 
      <Button
        className={buttonStyle} 
        onClick={()=>handleSubmit(handleClickCreate)}
      >
        저장
      </Button> : (
        <Flex
          gap={100}
          justify='flex-end'
          width='100%'
        >
          <Button
            className={buttonStyle}
            onClick={handleClickDelete}
            style='weak'
            variant='destructive'
          >
            삭제
          </Button>
          <Button 
            className={buttonStyle}
            onClick={()=>handleSubmit(handleClickEdit)}
          >
            저장
          </Button>
        </Flex>
      )
  );
};