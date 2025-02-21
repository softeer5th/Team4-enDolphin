import { type QueryClient, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { ongoingQueryKey, upcomingQueryKey } from '@/features/shared-schedule/api/keys';
import clsx from '@/utils/clsx';

import { useDiscussionMutation } from '../../api/mutations';
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
  const queryClient = useQueryClient();
  const { name, formState, onSubmit, isValid } = useFormContext();
  const navigate = useNavigate();
  const { mutate } = useDiscussionMutation();

  const typeMap: Record<FormType, Record<string, string>> = {
    add: {
      text: '생성하기',
      navigate: '/discussion/create/$id',
    },
    edit: {
      text: '수정하기',
      navigate: '/discussion/$id',
    },
  };

  const handleClickEnrollButton = () => {
    const callback = (id: string) => {
      invalidateScheduleCaches(queryClient);
      onSubmit();
      navigate({
        to: typeMap[type].navigate,
        params: { id },
      });
    };
    mutate({ body: formState, callback });
  };

  return (
    <Button
      className={clsx(name, buttonStyle)}
      disabled={!isValid()}
      onClick={handleClickEnrollButton}
      size='xl'
    >
      {typeMap[type].text}
    </Button>
  );
};

const invalidateScheduleCaches = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: upcomingQueryKey });
  queryClient.invalidateQueries({ queryKey: ongoingQueryKey.all });
};

export default FormButton;