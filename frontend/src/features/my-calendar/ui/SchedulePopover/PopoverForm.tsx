import { Checkbox } from '@/components/Checkbox';
import { Flex } from '@/components/Flex';
import Input from '@/components/Input';
import { Text } from '@/components/Text';
import { Toggle } from '@/components/Toggle';
import type { FormRef } from '@/hooks/useFormRef';
import { vars } from '@/theme/index.css';
import { formatDateToTimeString } from '@/utils/date/format';

import type { PersonalEventRequest } from '../../model';
import { cardStyle, inputStyle } from './index.css';

// TODO: Form Context 관리
const AdjustableCheckbox = (
  { valuesRef, handleChange }: FormRef<PersonalEventRequest>,
) => (
  <Checkbox
    defaultChecked={valuesRef.current.isAdjustable}
    inputProps={{
      defaultChecked: valuesRef.current.isAdjustable,
      name: 'isAdjustable',
      onChange: (e) => handleChange({ name: 'isAdjustable', value: e.target.checked }),
    }}
    size='sm'
  >
    시간 조정 가능
  </Checkbox>
);

const GoogleCalendarToggle = (
  { valuesRef, handleChange }: FormRef<PersonalEventRequest>,
) =>
  <Toggle
    defaultChecked={valuesRef.current.syncWithGoogleCalendar}
    inputProps={{
      name: 'syncWithGoogleCalendar',
      onChange: (e) => handleChange({ name: 'syncWithGoogleCalendar', value: e.target.checked }),
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
        defaultValue={valuesRef.current.title}
        name='title'
        onChange={(e) => handleChange({ name: 'title', value: e.target.value })}
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