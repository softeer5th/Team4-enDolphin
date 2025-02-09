import Input from '@/components/Input';

interface MeetingTitleProps {
  value: string;
  handleChange: ({ name, value }: { name: string; value: string }) => void;
}

const MeetingTitle = ({ value, handleChange }: MeetingTitleProps) => (
  <Input.Single
    inputProps={{
      name: 'title',
      value,
      onChange: (e) => handleChange(e.target),
    }}
    label='제목'
    placeholder='일정 제목은 필수에요'
    required
    type='text'
  />
);

export default MeetingTitle;