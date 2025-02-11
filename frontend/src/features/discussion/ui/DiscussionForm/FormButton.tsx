import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import clsx from '@/utils/clsx';

import type { DiscussionRequest } from '../../model';
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
  const { name, formState, validationRef, onSubmit } = useFormContext();
  const typeMap: Record<FormType, string> = {
    add: '생성하기',
    edit: '수정하기',
  };

  const isValidForm = Object.keys(formState as Record<string, unknown>).every((key) => {
    if (key === 'title' || key === 'dateRangeStart' || key === 'dateRangeEnd'
      || key === 'timeRangeStart' || key === 'timeRangeEnd' || key === 'duration'
    ) {
      if (!formState[key]) return false;
    }
    const validateFn = validationRef.current[key as keyof DiscussionRequest];
    return !validateFn || validateFn?.(formState[key as keyof DiscussionRequest]);
  });

  return (
    <Button
      className={clsx(name, buttonStyle)}
      disabled={!isValidForm}
      onClick={onSubmit}
      size='xl'
    >
      {typeMap[type]}
    </Button>
  );
};

export default FormButton;