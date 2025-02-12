import type { ComponentType, JSX  } from 'react';
import { useRef } from 'react';

import { useCarouselControl } from '@/hooks/useCarousel';

import { carouselStyle, carouselTrackStyle } from './index.css';

interface CarouselProps<T> {
  datas: T[];
  CardElement: ComponentType<T>;
}

const Carousel: <T>(props: CarouselProps<T>) => JSX.Element = ({ datas, CardElement }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { offsetX, translateCarousel } = useCarouselControl({ trackRef });
  return (
    <div className={carouselStyle}>
      <div
        className={carouselTrackStyle}
        ref={trackRef}
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        {datas.map((data, index) => (
          <CardElement key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;