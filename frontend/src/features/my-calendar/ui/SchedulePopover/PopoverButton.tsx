import Button from '@/components/Button';
import { Flex } from '@/components/Flex';

import type { PopoverType } from '../../model';
import { buttonStyle } from './index.css';

interface PopoverButtonProps {
  type: PopoverType;
  onClickCreate: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export const PopoverButton = ({ type, ...handlers }: PopoverButtonProps)=>(
  type === 'add' ? <Button className={buttonStyle} onClick={handlers.onClickCreate}>저장</Button> : (
    <Flex
      gap={100}
      justify='flex-end'
      width='100%'
    >
      <Button
        className={buttonStyle}
        onClick={handlers.onClickDelete}
        style='weak'
        variant='destructive'
      >
        삭제
      </Button>
      <Button className={buttonStyle} onClick={handlers.onClickEdit}>저장</Button>
    </Flex>
  )
);