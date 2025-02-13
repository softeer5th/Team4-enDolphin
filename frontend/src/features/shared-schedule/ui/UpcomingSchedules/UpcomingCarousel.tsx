
import ScheduleCard from './ScheduleCard';
import { carouselStyle, carouselTrackStyle } from './UpcomingCarousel.css';

interface UpcomingCarouselProps {
  schedules: object[];
  offsetX: number;
}

const UpcomingCarousel = ({ schedules, offsetX }: UpcomingCarouselProps) => (
  <div className={carouselStyle}>
    <div
      className={carouselTrackStyle}
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      {schedules.map((_, index) => (
        <ScheduleCard key={index} selected={false} />
      ))}
    </div>
  </div>
);

export default UpcomingCarousel;
