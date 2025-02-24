import { Link } from '@tanstack/react-router';

import { Flex } from '@/components/Flex';
import googleLoginIcon from '@/components/Icon/png/google-login-icon.png';
import { Text } from '@/components/Text';
import { serviceENV } from '@/envconfig';
import { vars } from '@/theme/index.css';

import { googleLoginButtonStyle } from './index.css';

export const GoogleLoginButton = () => (
  <Flex
    align='center'
    as={Link}
    className={googleLoginButtonStyle}
    gap={200}
    justify='center'
    to={serviceENV.GOOGLE_OAUTH_URL}
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
  