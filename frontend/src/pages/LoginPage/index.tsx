import { Modal } from '@/components/Modal';
import { GoogleLoginButton } from '@/features/login/ui/GoogleLoginButton';

import { backdropStyle } from './index.css';

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

export default LoginPage;