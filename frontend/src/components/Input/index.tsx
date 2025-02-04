
import MultiInput from './MultiInput';
import SingleInput from './SingleInput';

export const ICON_WIDTH = 20;

export interface CommonInputProps {
  label: string;
  type: 'text' | 'select';
  isValid?: boolean;
  required?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
  onClick?: () => void;
}

export const Input = () => {
  throw new Error('!!! Input.Single 혹은 Input.Multi를 사용해주세요 !!!');  
};

Input.Single = SingleInput;
Input.Multi = MultiInput;

export default Input;