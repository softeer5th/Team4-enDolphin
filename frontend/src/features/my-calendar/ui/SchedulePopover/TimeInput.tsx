import Input from '@/components/Input';
import { isSameDate } from '@/utils/date';
import { formatTimeStringToNumber } from '@/utils/date/format';

import { usePopoverFormContext } from './PopoverContext';

export const TimeInput = () => {
  const { valuesRef, setValidation, errors, isValid, handleChange } = usePopoverFormContext();
  
  setValidation('startTime', () => {
    const startTime = formatTimeStringToNumber(valuesRef.current.startTime);
    const endTime = formatTimeStringToNumber(valuesRef.current.endTime);
    if (isSameDate(new Date(valuesRef.current.startDate), new Date(valuesRef.current.endDate)) 
        && startTime >= endTime) return '시작 시간은 종료 시간보다 빨라야 합니다.';
    return null;
  });
  
  return (
    <Input.Multi
      borderPlacement='container'
      error={errors('startTime')}
      isValid={isValid('startTime')}
      label='시간 설정'
      separator='~'
      type='text'
    >
      <Input.Multi.InputField 
        defaultValue={valuesRef.current.startTime}
        onChange={(e) => handleChange({ 
          name: 'startTime', 
          value: e.target.value,
        })}
      />
      <Input.Multi.InputField
        defaultValue={valuesRef.current.endTime}
        onChange={(e) => handleChange({ 
          name: 'endTime', 
          value: e.target.value,
        })}
      />
    </Input.Multi>
  ); 
};
  