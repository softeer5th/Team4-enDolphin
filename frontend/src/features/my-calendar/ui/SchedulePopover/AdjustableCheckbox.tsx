import { Checkbox } from '@/components/Checkbox';

import { usePopoverFormContext } from './PopoverContext';

export const AdjustableCheckbox = () => {
  const { valuesRef, handleChange } = usePopoverFormContext();
  
  return (
    <Checkbox
      defaultChecked={valuesRef.current.isAdjustable}
      inputProps={{
        name: 'isAdjustable',
        onChange: (e) => handleChange({ name: 'isAdjustable', value: e.target.checked }),
      }}
      size='sm'
    >
      시간 조정 가능
    </Checkbox>
  );
};