import Button from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Flex } from '@/components/Flex';
import { Plus } from '@/components/Icon';
import Input from '@/components/Input';
import { Text } from '@/components/Text';
import { Toggle } from '@/components/Toggle';
import { vars } from '@/theme/index.css';

import { buttonStyle, cardStyle, containerStyle, inputStyle, titleStyle } from './index.css';

interface SchedulePopoverProps {
  isOpen: boolean;
}

export const SchedulePopover = ({ isOpen }: SchedulePopoverProps) => (
  <dialog className={containerStyle} open={isOpen}>
    <Text
      className={titleStyle}
      color={vars.color.Ref.Netural[600]}
      typo='t3'
    >
      <Plus stroke={vars.color.Ref.Netural[600]} width={20} />
      일정 추가
    </Text>
    <Flex
      align='flex-end'
      className={cardStyle}
      direction='column'
      gap={400}
    >
      <input className={inputStyle} placeholder='새 일정' />
      {/* TODO: Input 커스텀 스타일 */}
      <Input.Multi
        label='시간 설정'
        separator='~'
        type='text'
      >
        <Input.Multi.InputField />
        <Input.Multi.InputField />
      </Input.Multi>
      <Checkbox size='sm'>시간 조정 가능</Checkbox>
    </Flex>
    <Flex className={cardStyle} justify='space-between'>
      <Text color={vars.color.Ref.Netural[600]} typo='caption'>구글 캘린더 연동</Text>
      <Toggle />
    </Flex>
    <Button className={buttonStyle}>저장</Button>
  </dialog>
);