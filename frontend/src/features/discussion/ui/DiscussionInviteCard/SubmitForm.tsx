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

const LOCK_TIME_IN_MINUTES = 5;
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_IN_MILLISECONDS = LOCK_TIME_IN_MINUTES * MINUTE_IN_MILLISECONDS;

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
        } else if (data.failedCount < 5) {
          addNoti(passwordIncorrectNotiProps(data.failedCount));
        } else {
          setUnlockDT(new Date(Date.now() + LOCK_TIME_IN_MILLISECONDS));
          addNoti(passwordLockNotiProps);
        }
      },
      onError: (error: Error) => {
        if (error instanceof HTTPError && error.isTooManyRequestsError()) {
          setUnlockDT(new Date(Date.now() + LOCK_TIME_IN_MILLISECONDS)); 
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

const passwordIncorrectNotiProps = (failedCount: number) => ({
  type: 'error' as const,
  title: `비밀번호가 일치하지 않습니다 - ${MAX_FAILED_ATTEMPTS - failedCount}회 남음`,
  description: 
  `비밀번호를 ${MAX_FAILED_ATTEMPTS}회 틀릴 시 ${LOCK_TIME_IN_MINUTES}분간 초대를 수락할 수 없게 되니 주의해주세요!`,
});

const passwordLockNotiProps = {
  type: 'error' as const,
  title: `비밀번호를 ${MAX_FAILED_ATTEMPTS}회 틀려 ${LOCK_TIME_IN_MINUTES}분간 잠금됩니다.`,
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

