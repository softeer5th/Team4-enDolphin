import Button from '@/components/Button';
import { Google } from '@/components/Icon';
import { Image } from '@/components/Image';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import {
  buttonStyle,
  containerStyle,
  descriptionStyle,
  imageStyle,
  imageWrapperStyle,
  subTitleStyle,
  titleStyle,
} from './index.css';

const LandingImages = () => (
  <div className={imageWrapperStyle}>
    <Image
      alt='구글 캘린더 연동으로 간편하고 빠른 일정입력'
      className={imageStyle}
      src='/images/landing/landing-1.webp'
    />
    <Image
      alt='참여자들의 일정을 고려한 추천으로 간단하게 끝나는 일정 조율'
      className={imageStyle}
      src='/images/landing/landing-2.webp'
    />
  </div>
);

const LandingPage = () => {
  const handleClickGoogleLogin = () => { 
    // Do something
  };
  
  return (
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
  );
};

export default LandingPage;