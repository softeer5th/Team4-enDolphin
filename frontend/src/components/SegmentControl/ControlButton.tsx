import { useSafeContext } from '@/hooks/useSafeContext';

import Button from '../Button';
import type { SegmentControlProps, SegmentOption } from '.';
import { SegmentControlContext } from './SegmentControlContext';

interface ControlButtonProps {
  segmentOption: SegmentOption;
  segmentControlStyle: SegmentControlProps['style'];
  onButtonHover?: (value: string) => void;
}

const ControlButton = ({ 
  segmentOption, 
  segmentControlStyle,
  onButtonHover,
}: ControlButtonProps ) => {
  const { selectedValue, handleSelect } = useSafeContext(SegmentControlContext);
  const { label, value } = segmentOption;
  return (
    <Button
      as='li'
      onClick={() => handleSelect(value)}
      onMouseEnter={() => onButtonHover?.(value)}
      radius='max'
      size='lg'
      style={getButtonStyle(selectedValue === value, segmentControlStyle)}
      variant='secondary'
    >
      {label}
    </Button>
  );
};

const getButtonStyle = (isSelected: boolean, segmentControlStyle: SegmentControlProps['style']) => {
  if (!isSelected) return 'borderless';
  if (segmentControlStyle === 'filled') return 'filled';
  return 'weak';
};

export default ControlButton;