import { Checkbox } from '@/components/Checkbox';
import { Flex } from '@/components/Flex';
import Input from '@/components/Input';
import { Text } from '@/components/Text';
import { Toggle } from '@/components/Toggle';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date';

import { cardStyle, inputStyle } from './index.css';

interface PopoverFormProps {
  startDate: Date | null;
  endDate: Date | null;
}

export const PopoverForm = ({ startDate, endDate }: PopoverFormProps) => 
  // form 관리
  (
    <>
      <Flex
        align='flex-end'
        className={cardStyle}
        direction='column'
        gap={400}
      >
        <input className={inputStyle} placeholder='새 일정' />
        <Input.Multi
          borderPlacement='container'
          label='시간 설정'
          separator='~'
          type='text'
        >
          <Input.Multi.InputField value={formatDateToTimeString(startDate)} />
          <Input.Multi.InputField value={formatDateToTimeString(endDate)} />
        </Input.Multi>
        <Checkbox size='sm'>시간 조정 가능</Checkbox>
      </Flex>
      <Flex className={cardStyle} justify='space-between'>
        <Text color={vars.color.Ref.Netural[600]} typo='caption'>구글 캘린더 연동</Text>
        <Toggle />
      </Flex>
    </>
  )
;