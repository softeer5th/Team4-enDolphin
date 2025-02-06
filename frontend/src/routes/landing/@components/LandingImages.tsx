import { Image } from '@/components/Image';

import { imageStyle, imageWrapperStyle } from './index.css';

export const LandingImages = () => (
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