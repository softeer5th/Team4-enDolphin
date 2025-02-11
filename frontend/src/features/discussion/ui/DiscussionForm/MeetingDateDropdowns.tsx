import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { formatDateToDotString } from '@/utils/date/format';

import { useFormContext } from './FormContext';

const MeetingDateDropdowns = () => {
  const { formState, handleUpdateField } = useFormContext();
  const navigation = useMonthNavigation();

  return (
    <DatePicker.Range
      {...navigation}
      highlightRange={{ 
        start: formState.dateRangeStart ? new Date(formState.dateRangeStart) : null,
        end: formState.dateRangeEnd ? new Date(formState.dateRangeEnd) : null, 
      }}
      setHighlightEnd={(date) => handleUpdateField('dateRangeEnd', formatDateToDotString(date))}
      setHighlightStart={(date) => handleUpdateField('dateRangeStart', formatDateToDotString(date))}
      trigger={
        <Input.Multi
          hint='일정을 잡을 날짜 범위를 입력해주세요'
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