import { useMutation } from '@tanstack/react-query';
import { useTransition } from 'react';

import { Flex } from '@/components/Flex';
import googleLoginIcon from '@/components/Icon/png/google-login-icon.png';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { requestGoogleLoginUrl } from '@/features/login/api';
import { vars } from '@/theme/index.css';

import { backdropStyle, googleLoginButtonStyle } from './index.css';

const LoginPage = () => {
  const [isRedirectPending, startRedirectTransition] = useTransition();
  const googleLogin = useMutation({
    mutationFn: requestGoogleLoginUrl,
    onSuccess: ({ url }) => {
      startRedirectTransition(async () => {
        window.location.href = url;
      });
    },
  });

  const onGoogleLoginButtonClick = async () => {
    googleLogin.mutate();
  };

  return (
    <div className={backdropStyle}>
      <Modal
        description={`Google 계정으로 간편하게 가입하고, 팀 프로젝트 일정 관리와 협업을 시작해보세요. 
        ’언제만나?’는 대학생을 위한 최고의 팀플 관리 도구입니다!`}
        isOpen={true} 
        subTitle='로그인/회원가입'
        title='언제만나 시작하기'
      >
        <Modal.Footer>
          <GoogleLoginButton disabled={isRedirectPending} onClick={onGoogleLoginButtonClick} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const GoogleLoginButton = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => (
  <Flex
    align='center'
    as='button'
    className={googleLoginButtonStyle}
    disabled={disabled}
    gap={200}
    justify='center'
    onClick={onClick}
    width='full'
  >
    <img
      alt='Google 로그인 아이콘'
      height='20px'
      src={googleLoginIcon}
      width='20px'
    />
    <Text color={vars.color.Ref.Netural[400]} typo='t3'>Google로 시작하기</Text>
  </Flex>
);

export default LoginPage;