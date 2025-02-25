import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { addNoti } from '@/store/global/notification';

import { invitationQueryKey } from '../../api/keys';
import { useInvitationJoinMutation } from '../../api/mutations';
import { inputStyle, submitFormStyle } from './index.css';
import TimerButton from './TimerButton';
;

interface SubmitFormProps {
  discussionId: number;
  canJoin: boolean;
  requirePW: boolean;
  unlockDateTime: Date | null;
}

const SubmitForm = ({ discussionId, requirePW, canJoin, unlockDateTime }: SubmitFormProps) => {
  const navigate = useNavigate();
  const { mutate } = useInvitationJoinMutation();
  const [password, setPassword] = useState('');
  const handleJoinClick = () => {
    mutate(
      { body: { discussionId, password: password === '' ? undefined : password } },
      {
        onSuccess: (data) => {
          if (data.isSuccess) {
            navigate({ to: '/discussion/$id', params: { id: discussionId.toString() } });
          } else {
            addNoti({ type: 'error', title: `비밀번호가 일치하지 않습니다 - ${data.failedCount}회 시도` });
          }
        },
        onError: () => {
          addNoti({ type: 'error', title: '에러' }); 
        },
      },
    );
  };
  return(
    <Flex align='flex-end' gap={500}>
      {requirePW && (
        <input
          className={inputStyle}
          disabled={!canJoin}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='숫자 4~6자리 비밀번호'
        />
      )}
      <JoinButton
        canJoin={canJoin}
        discussionId={discussionId}
        initialUnlockDateTime={unlockDateTime}
        onClick={handleJoinClick}
      />
    </Flex>
  ); 
};

const JoinButton = ({ discussionId, canJoin, onClick, initialUnlockDateTime }: { 
  discussionId: number;
  canJoin: boolean;
  onClick: () => void;
  initialUnlockDateTime: Date | null;
}) => {
  const queryClient = useQueryClient();
  const onTimeEnd = () => {
    queryClient.invalidateQueries({ queryKey: invitationQueryKey(discussionId) });
  };
  
  return (
    initialUnlockDateTime === null ?
      <Button
        disabled={!canJoin}
        onClick={onClick}
        size='xl'
      >
        초대 수락하기
      </Button>
      :
      <TimerButton onTimeEnd={onTimeEnd} targetDateTime={initialUnlockDateTime} />
  ); 
};

export default SubmitForm;

