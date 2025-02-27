import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { addNoti } from '@/store/global/notification';
import { MINUTE_IN_MILLISECONDS } from '@/utils/date';
import { HTTPError } from '@/utils/error';

import { useInvitationJoinMutation } from '../../api/mutations';
import { inputStyle } from './index.css';
import TimerButton from './TimerButton';

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
  const [unlockDT, setUnlockDT] = useState<Date | null>(unlockDateTime);
  const handleJoinClick = () => {
    mutate(
      { body: { discussionId, password: password === '' ? undefined : password } },
      { onSuccess: (data) => {
        if (data.isSuccess) {
          navigate({ to: '/discussion/$id', params: { id: discussionId.toString() } });
        } else {
          addNoti({ type: 'error', title: `비밀번호가 일치하지 않습니다 - ${data.failedCount}회 시도` });
        }
      },
      onError: (error: Error) => {
        if (error instanceof HTTPError && error.isTooManyRequestsError()) {
          setUnlockDT(new Date(Date.now() + 5 * MINUTE_IN_MILLISECONDS)); 
        }
      } });
  };
  return (
    <Flex align='flex-end' gap={500}>
      {requirePW && canJoin && <PasswordInput onChange={setPassword} />}
      <JoinButton
        canJoin={canJoin}
        initialUnlockDateTime={unlockDT}
        onClick={handleJoinClick}
        onTimeEnd={() => setUnlockDT(null)}
      />
    </Flex>
  ); 
};

const PasswordInput = ({ onChange }: { onChange: (password: string) => void }) => (
  <input
    className={inputStyle}
    onChange={(e) => onChange(e.target.value)}
    placeholder='숫자 4~6자리 비밀번호'
  />
);

const JoinButton = ({ canJoin, onClick, initialUnlockDateTime, onTimeEnd }: { 
  canJoin: boolean;
  onClick: () => void;
  onTimeEnd: () => void;
  initialUnlockDateTime: Date | null;
}) => (
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

export default SubmitForm;

