import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import clsx from '@/utils/clsx';

import { useFormContext } from './FormContext';
import { buttonStyle } from './index.css';
import type { FormType } from './type';

const FormButton = ({ type }: { type: FormType }) => {
  const handleClickDeleteDiscussion = () => {
    /* Do something */
  };
  return (
    type === 'add' ? (
      <EnrollButton type={type} />
    ) : (
      <Flex
        gap={100}
        justify='flex-end'
        width='100%'
      >
        <Button
          onClick={handleClickDeleteDiscussion}
          size='xl'
          style='outline'
          variant='re'
        >
          삭제하기
        </Button>
        <EnrollButton type={type} />
      </Flex>
    )
  );
};

const EnrollButton = ({ type }: { type: FormType }) => {
  const { name, isValid, onSubmit } = useFormContext();
  const typeMap: Record<FormType, string> = {
    add: '생성하기',
    edit: '수정하기',
  };

  return (
    <Button
      className={clsx(name, buttonStyle)}
      disabled={!isValid}
      onClick={onSubmit}
      size='xl'
    >
      {typeMap[type]}
    </Button>
  );
};

export default FormButton;