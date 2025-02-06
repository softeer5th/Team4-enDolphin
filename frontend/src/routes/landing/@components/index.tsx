import Button from '@/components/Button';
import { Goggle } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { 
  buttonStyle, 
  containerStyle, 
  descriptionStyle, 
  subTitleStyle, 
  titleStyle, 
} from './index.css';

const Landing = () => {
  const handleClickGoogleLogin = () => {
    // do someting
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
        leftIcon={<Goggle />}
        onClick={handleClickGoogleLogin}
        size='xl'
      >
        Google로 시작하기
      </Button>
    </div>
  );
};

export default Landing;