import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { isSameDate } from '@/utils/date';
import { formatDateToBarString } from '@/utils/date/format';

import { useFormContext } from './FormContext';

const MeetingDateDropdowns = () => {
  const { formState, validationRef, setValidation, handleUpdateField } = useFormContext();
  const navigation = useMonthNavigation();

  const validateDateRange = () => {
    const today = new Date();
    const dateRangeStart = new Date(formState.dateRangeStart);
    if (!formState.dateRangeStart || !formState.dateRangeEnd) return false;
    if (isSameDate(today, dateRangeStart)) return true;
    return today < dateRangeStart;
  };

  setValidation('dateRangeStart', validateDateRange);

  return (
    <DatePicker.Range
      {...navigation}
      highlightRange={{ 
        start: formState.dateRangeStart ? new Date(formState.dateRangeStart) : null,
        end: formState.dateRangeEnd ? new Date(formState.dateRangeEnd) : null, 
      }}
      setHighlightEnd={(date) => handleUpdateField('dateRangeEnd', formatDateToBarString(date))}
      setHighlightStart={(date) => handleUpdateField('dateRangeStart', formatDateToBarString(date))}
      trigger={
        <Input.Multi
          error='과거의 날짜는 포함할 수 없습니다.'
          hint='일정을 잡을 날짜 범위를 입력해주세요'
          isValid={validationRef.current.dateRangeStart?.(formState.dateRangeStart)}
          label='기간 설정'
          required={true}
          separator='~'
          type='select'
        >
          <Input.Multi.InputField value={formState.dateRangeStart} />
          <Input.Multi.InputField value={formState.dateRangeEnd} />
        </Input.Multi>
      }
    />
  );
};

export default MeetingDateDropdowns;