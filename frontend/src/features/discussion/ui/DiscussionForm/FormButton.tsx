import Button from '@/components/Button';

import { useFormContext } from './FormContext';
import { buttonStyle } from './index.css';

const FormButton = () => {
  const { onSubmit } = useFormContext();
  return (
    <Button
      className={buttonStyle}
      onClick={onSubmit}
      size='xl'
    >
      생성하기
    </Button>
  );
};

export default FormButton;