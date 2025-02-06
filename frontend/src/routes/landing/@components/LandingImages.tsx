import { imageStyle, imageWrapperStyle } from './index.css';

export const LandingImages = () => (
  <div className={imageWrapperStyle}>
    <img
      alt='구글 캘린더 연동으로 간편하고 빠른 일정입력'
      className={imageStyle}
      src='/images/landing/landing-1.png'
    />
    <img
      alt='참여자들의 일정을 고려한 추천으로 간단하게 끝나는 일정 조율'
      className={imageStyle}
      src='/images/landing/landing-2.png'
    />
  </div>
);