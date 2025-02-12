import type { PopoverType } from '../../model';
import { containerStyle } from './index.css';
import { PopoverButton } from './PopoverButton';
import { PopoverForm } from './PopoverForm';
import { Title } from './Title';

interface SchedulePopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: PopoverType;
}

export const SchedulePopover = ({ isOpen, setIsOpen, type }: SchedulePopoverProps) => {
  if (!isOpen) return null;

  const handleClickSave = () => {
    setIsOpen(false);
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