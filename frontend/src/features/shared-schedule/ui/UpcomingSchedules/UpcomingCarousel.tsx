
import type { UpcomingSchedule } from '../../model';
import ScheduleCard from './ScheduleCard';
import { carouselStyle, carouselTrackStyle } from './UpcomingCarousel.css';

interface UpcomingCarouselProps {
  schedules: UpcomingSchedule[];
  offsetX: number;
}

const UpcomingCarousel = ({ schedules, offsetX }: UpcomingCarouselProps) => (
  <div className={carouselStyle}>
    <div
      className={carouselTrackStyle}
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      {schedules.map((schedule, index) => (
        <ScheduleCard
          key={schedule.id}
          latest={false}
          schedule={schedule}
        />
      ))}
    </div>
  </div>
);

export default UpcomingCarousel;
