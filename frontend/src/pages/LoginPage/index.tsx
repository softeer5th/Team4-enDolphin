import { Link } from '@tanstack/react-router';

import { Flex } from '@/components/Flex';
import googleLoginIcon from '@/components/Icon/png/google-login-icon.png';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { serviceENV } from '@/envconfig';
import { vars } from '@/theme/index.css';

import { backdropStyle, googleLoginButtonStyle } from './index.css';

const LoginPage = () => (
  <div className={backdropStyle}>
    <Modal
      description={`Google 계정으로 간편하게 가입하고, 팀 프로젝트 일정 관리와 협업을 시작해보세요. 
        ’언제만나?’는 대학생을 위한 최고의 팀플 관리 도구입니다!`}
      isOpen={true} 
      subTitle='로그인/회원가입'
      title='언제만나 시작하기'
    >
      <Modal.Footer>
        <GoogleLoginButton />
      </Modal.Footer>
    </Modal>
  </div>
);

const GoogleLoginButton = () => (
  <Flex
    align='center'
    as={Link}
    className={googleLoginButtonStyle}
    gap={200}
    justify='center'
    to={serviceENV.VITE_GOOGLE_OAUTH_URL}
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