import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { formatDateToDotString } from '@/utils/date/format';

import type { DiscussionRequest } from '../../model';
import { useFormContext } from './FormContext';
import { inputStyle } from './index.css';

const MeetingDeadlineDropdown = ({ name }: { name: keyof DiscussionRequest }) => {
  const { formState, handleUpdateField } = useFormContext();
  const navigation = useMonthNavigation();

  return (
    <DatePicker.Select
      {...navigation}
      handleDateSelect={(date) => handleUpdateField(name, formatDateToDotString(date))}
      selectedDate={new Date(formState[name] as string)}
      trigger={
        <div className={inputStyle}>
          <Input.Single
            inputProps={{
              name,
              value: formState[name] as string,
              onChange: ((e) => handleUpdateField(name, e.target.value)),
            }}
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