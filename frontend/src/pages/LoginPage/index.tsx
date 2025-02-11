import Button from '@/components/Button';
import { requestGoogleLogin } from '@/features/login/api';

const LoginPage = () => {
  const a = 1;

  return (
    <div>
      <Button onClick={() => requestGoogleLogin()}>구글로그인</Button>
    </div>
  );
};

export default LoginPage;