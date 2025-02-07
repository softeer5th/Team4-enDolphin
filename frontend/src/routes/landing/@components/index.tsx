import { useNavigate } from '@tanstack/react-router';

import Button from '@/components/Button';
import { Google } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import GNB from './GNB';
import {
  buttonStyle,
  containerStyle,
  descriptionStyle,
  subTitleStyle,
  titleStyle,
} from './index.css';
import { LandingImages } from './LandingImages';
const Landing = () => {
  const navigate = useNavigate({ from: '/landing' });

  const handleClickGoogleLogin = () => { 
    navigate({ to: '/my-schedule' });
  };
  return (
    <>
      <GNB />
      <div className={containerStyle}>
        <h1 className={titleStyle}>
          언제 만나?
        </h1>
        <h2 className={subTitleStyle}>
          더이상 고민하지 마세요!
        </h2>
        <Text
          className={descriptionStyle}
          color={vars.color.Ref.Netural[700]}
          typo='b2M'
        >
          당신과 모두의 일정을 하나로 연결해 가장 완벽한 약속 시간을 찾아드려요 
          <br />
          당신과 모두의 시간을 위해, 지금 바로 시작하세요.
        </Text>
        <Button
          className={buttonStyle}
          leftIcon={<Google />}
          onClick={handleClickGoogleLogin}
          size='xl'
        >
          Google로 시작하기
        </Button>
        <LandingImages />
      </div>
    </>
  );
};

export default Landing;