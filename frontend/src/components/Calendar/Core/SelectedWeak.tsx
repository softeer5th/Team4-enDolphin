import { vars } from '../../../theme/index.css';
import { Text } from '../../Text';
import { sideCellStyle, weekCellStyle, weekStyle } from '../index.css';

export const SelectedWeak = () => {
  const WEAK = ['SON', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return (
    <div className={weekStyle}>
      <div className={sideCellStyle({
        time: 'default', 
      })}
      />
      {WEAK.map((weak) => (
        <div className={weekCellStyle} key={weak}>
          <Text color={vars.color.Ref.Netural[600]} typo='b3M'>{weak}</Text>
        </div>
      ))}
    </div>
  );
};