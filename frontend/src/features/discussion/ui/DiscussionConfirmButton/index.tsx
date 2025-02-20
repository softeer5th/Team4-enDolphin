import { useParams } from '@tanstack/react-router';

import Button from '@/components/Button';

import { useDiscussionConfirmMutation } from '../../api/mutations';
import { useDiscussionHostQuery } from '../../api/queries';
import type { DiscussionDTO } from '../../model';

const DiscussionConfirmButton = (
  { startDateTime, endDateTime }: Omit<DiscussionDTO, 'usersForAdjust'>,
) => {
  const param: { id: string } = useParams({ from: '/_main/discussion/$id' });
  const { isHost, isPending } = useDiscussionHostQuery(param.id);
  const { mutate } = useDiscussionConfirmMutation();

  if (isPending || !isHost) return null;
  
  const handleClickConfirm = () => {
    if (!param.id) return;
    mutate({
      id: param.id, 
      body: { startDateTime, endDateTime }, 
    });
  };

  return (
    <Button onClick={handleClickConfirm}>일정 확정하기</Button>
  );
};

export default DiscussionConfirmButton;