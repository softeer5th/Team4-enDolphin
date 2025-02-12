import { useRef } from 'react';

import ScheduleCard from './ScheduleCard';
import { carouselStyle, carouselTrackStyle } from './upcomingCarousel.css';

interface UpcomingCarouselProps {
  schedules: object[];
  offsetX: number;
}

const UpcomingCarousel = ({ schedules, offsetX }: UpcomingCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className={carouselStyle}>
      <div
        className={carouselTrackStyle}
        ref={trackRef}
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        {schedules.map((schedule, index) => (
          <ScheduleCard key={index} selected={false} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingCarousel;
