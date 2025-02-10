import Button from '@/components/Button';
import clsx from '@/utils/clsx';

import { useFormContext } from './FormContext';
import { buttonStyle } from './index.css';

const FormButton = () => {
  const { name, isValid, onSubmit } = useFormContext();
  return (
    <Button
      className={clsx(name, buttonStyle)}
      disabled={!isValid}
      onClick={onSubmit}
      size='xl'
    >
      생성하기
    </Button>
  );
};

export default FormButton;