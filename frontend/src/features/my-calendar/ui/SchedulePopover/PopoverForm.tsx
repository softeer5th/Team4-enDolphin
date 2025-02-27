import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { AdjustableCheckbox } from './AdjustableCheckbox';
import { DateInput } from './DateInput';
import { GoogleCalendarToggle } from './GoggleCalendarToggle';
import { cardStyle, inputStyle } from './index.css';
import { usePopoverFormContext } from './PopoverContext';
import { TimeInput } from './TimeInput';

export const PopoverForm = () => { 
  const { valuesRef, handleChange } = usePopoverFormContext();
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
          defaultValue={valuesRef.current.title}
          name='title'
          onChange={(e) => handleChange({ name: 'title', value: e.target.value })}
          placeholder='새 일정'
        />
        <DateInput />
        <TimeInput />
        <AdjustableCheckbox />
      </Flex>
      <Flex className={cardStyle} justify='space-between'>
        <Text color={vars.color.Ref.Netural[600]} typo='caption'>구글 캘린더 연동</Text>
        <GoogleCalendarToggle />
      </Flex>
    </>
  );
};