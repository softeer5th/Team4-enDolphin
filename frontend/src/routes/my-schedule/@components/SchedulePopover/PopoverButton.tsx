import Button from '@/components/Button';
import { Flex } from '@/components/Flex';

import type { PopoverType } from '../../@types';
import { buttonStyle } from './index.css';

interface PopoverButtonProps {
  type: PopoverType;
  onClickSave: () => void;
  onClickDelete: () => void;
}

export const PopoverButton = ({ type, ...handlers }: PopoverButtonProps)=>(
  type === 'add' ? <Button className={buttonStyle} onClick={handlers.onClickSave}>저장</Button> : (
    <Flex
      gap={100}
      justify='flex-end'
      width='100%'
    >
      <Button
        className={buttonStyle}
        onClick={handlers.onClickDelete}
        style='weak'
        type='destructive'
      >
        삭제
      </Button>
      <Button className={buttonStyle} onClick={handlers.onClickSave}>저장</Button>
    </Flex>
  )
);