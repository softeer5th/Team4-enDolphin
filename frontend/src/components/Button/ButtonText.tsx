
import { Text } from '../Text';
import type { ButtonProps } from '.';

interface ButtonTextProps {
  children?: string;
  size: ButtonProps['size'];
}

const ButtonText = ({ size, children }: ButtonTextProps) => (
  <Text typo={size === 'sm' ? 'caption' : 't2'}>{children}</Text>
);
export default ButtonText;