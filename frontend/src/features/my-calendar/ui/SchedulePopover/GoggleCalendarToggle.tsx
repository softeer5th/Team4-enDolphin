import { Toggle } from '@/components/Toggle';

import { usePopoverFormContext } from './PopoverContext';

export const GoogleCalendarToggle = () => {
  const { valuesRef, handleChange } = usePopoverFormContext();
  
  return (
    <Toggle
      defaultChecked={valuesRef.current.syncWithGoogleCalendar}
      inputProps={{
        name: 'syncWithGoogleCalendar',
        onChange: (e) => handleChange({ name: 'syncWithGoogleCalendar', value: e.target.checked }),
      }}
    />
  );
};