import type { RefObject } from 'react';

import ScheduleCard from './ScheduleCard';
import { carouselStyle, carouselTrackStyle } from './upcomingCarousel.css';

interface UpcomingCarouselProps {
  schedules: object[];
  offsetX: number;
  trackRef: RefObject<HTMLDivElement | null>;
}

const UpcomingCarousel = ({ schedules, offsetX, trackRef }: UpcomingCarouselProps) => (
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

export default UpcomingCarousel;
