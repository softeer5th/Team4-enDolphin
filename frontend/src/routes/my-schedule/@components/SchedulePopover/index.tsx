
import type { PopoverType } from '../../@types';
import { containerStyle } from './index.css';
import { PopoverButton } from './PopoverButton';
import { PopoverForm } from './PopoverForm';
import { Title } from './Title';

interface SchedulePopoverProps {
  isOpen: boolean;
  type: PopoverType;
}

export const SchedulePopover = ({ isOpen, type }: SchedulePopoverProps) => {
  const handleClickSave = () => {
    // do something
  };
  const handleClickDelete = () => {
    // do something
  };

  return(
    <dialog className={containerStyle} open={isOpen}>
      <Title type={type} />
      <PopoverForm />
      <PopoverButton
        onClickDelete={handleClickDelete}
        onClickSave={handleClickSave}
        type={type}
      />
    </dialog>
  ); 
};