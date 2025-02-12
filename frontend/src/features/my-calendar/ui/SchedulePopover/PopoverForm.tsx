import { useRef } from 'react';

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

export const PopoverForm = ({ startDate, endDate }: PopoverFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const startTime = formatDateToTimeString(startDate);
  const endTime = formatDateToTimeString(endDate);
  
  return (
    <>
      <Flex
        align='flex-end'
        className={cardStyle}
        direction='column'
        gap={400}
      >
        <input
          className={inputStyle}
          placeholder='새 일정'
          ref={titleRef}
        />
        <Input.Multi
          borderPlacement='container'
          label='시간 설정'
          separator='~'
          type='text'
        >
          <Input.Multi.InputField defaultValue={startTime} readOnly />
          <Input.Multi.InputField defaultValue={endTime} readOnly />
        </Input.Multi>
        <Checkbox size='sm'>시간 조정 가능</Checkbox>
      </Flex>
      <Flex className={cardStyle} justify='space-between'>
        <Text color={vars.color.Ref.Netural[600]} typo='caption'>구글 캘린더 연동</Text>
        <Toggle />
      </Flex>
    </>
  );
};