import { Checkbox } from '@/components/Checkbox';
import { Flex } from '@/components/Flex';
import Input from '@/components/Input';
import { Text } from '@/components/Text';
import { Toggle } from '@/components/Toggle';
import type { FormRef } from '@/hooks/useFormRef';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date';

import type { PersonalEventRequest } from '../../model';
import { cardStyle, inputStyle } from './index.css';

// TODO: Form Context 관리
const AdjustableCheckbox = ({ handleChange, valuesRef }: FormRef<PersonalEventRequest>) => (
  <Checkbox
    inputProps={{
      name: 'isAdjustable',
      checked: valuesRef.current.isAdjustable,
      onChange: handleChange,
    }}
    size='sm'
  >
    시간 조정 가능
  </Checkbox>
);

const GoogleCalendarToggle = (
  { handleChange, valuesRef }: FormRef<PersonalEventRequest>,
) =>
  <Toggle
    inputProps={{
      name: 'syncWithGoogleCalendar',
      checked: valuesRef.current.syncWithGoogleCalendar,
      onChange: handleChange,
    }}
  />;

export const PopoverForm = ({ valuesRef, handleChange }: FormRef<PersonalEventRequest>) => 
  <>
    <Flex
      align='flex-end'
      className={cardStyle}
      direction='column'
      gap={400}
    >
      <input
        className={inputStyle}
        name='title'
        onChange={handleChange}
        placeholder='새 일정'
      />
      <Input.Multi
        borderPlacement='container'
        label='시간 설정'
        separator='~'
        type='text'
      >
        <Input.Multi.InputField 
          readOnly
          value={formatDateToTimeString(new Date(valuesRef.current.startDateTime))}
        />
        <Input.Multi.InputField
          readOnly
          value={formatDateToTimeString(new Date(valuesRef.current.endDateTime))}
        />
      </Input.Multi>
      <AdjustableCheckbox handleChange={handleChange} valuesRef={valuesRef} />
    </Flex>
    <Flex className={cardStyle} justify='space-between'>
      <Text color={vars.color.Ref.Netural[600]} typo='caption'>구글 캘린더 연동</Text>
      <GoogleCalendarToggle handleChange={handleChange} valuesRef={valuesRef} />
    </Flex>
  </>;