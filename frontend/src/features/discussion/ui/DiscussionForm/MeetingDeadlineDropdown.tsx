import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { isSameDate } from '@/utils/date';
import { formatDateToBarString } from '@/utils/date/format';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';
import { inputStyle } from './index.css';

const MeetingDeadlineDropdown = ({ name }: { name: keyof DiscussionRequest }) => {
  const { formState, isValid, setValidation, handleUpdateField, errors } = useFormContext();
  const navigation = useMonthNavigation();

  const validateDeadline = () => {
    const today = new Date();
    const deadline = new Date(formState.deadline);
    const endDate = new Date(formState.dateRangeEnd);

    if (!isSameDate(today, deadline) && deadline < today) return '오늘보다 빠른 날짜를 선택할 수 없습니다.';
    if (!isSameDate(endDate, deadline) && endDate < deadline) return '조율기간이 종료되기 전에 일정을 확정지어야 합니다.';
    return '';
  };
  setValidation(name, validateDeadline);

  return (
    <DatePicker.Select
      {...navigation}
      handleDateSelect={(date) => handleUpdateField(name, formatDateToBarString(date))}
      selectedDate={new Date(formState.deadline)}
      trigger={
        <div className={inputStyle}>
          <Input.Single
            error={errors(name)}
            inputProps={{
              name,
              value: formState.deadline,
              onChange: ((e) => handleUpdateField(name, e.target.value)),
            }}
            isValid={isValid(name)}
            label='마감기한'
            required={true}
            type='select'
          />
        </div>
      }
    />
  );
};

export default MeetingDeadlineDropdown;