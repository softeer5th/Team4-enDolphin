import { useSafeContext } from '@/hooks/useSafeContext';

import Button from '../Button';
import type { SegmentControlProps } from '.';
import { SegmentControlContext } from './SegmentControlContext';

interface ControlButtonProps {
  value: string;
  segmentControlStyle: SegmentControlProps['style'];
}

const ControlButton = ({ 
  value, 
  segmentControlStyle,
}: ControlButtonProps ) => {
  const { selectedValue, handleSelect } = useSafeContext(SegmentControlContext);
  
  return (
    <Button
      as='li'
      onClick={() => handleSelect(value)}
      radius='max'
      size='lg'
      style={getButtonStyle(selectedValue === value, segmentControlStyle)}
      variant='secondary'
    >
      {value}
    </Button>
  );
};

const getButtonStyle = (isSelected: boolean, segmentControlStyle: SegmentControlProps['style']) => {
  if (!isSelected) return 'borderless';
  if (segmentControlStyle === 'filled') return 'filled';
  return 'weak';
};

export default ControlButton;