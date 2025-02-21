
import type { UpcomingSchedule } from '../../model';
import ScheduleCard from './ScheduleCard';
import { carouselStyle, carouselTrackStyle } from './UpcomingCarousel.css';

interface UpcomingCarouselProps {
  schedules: UpcomingSchedule[];
  offsetX?: number;
}

const UpcomingCarousel = ({ schedules, offsetX = 0 }: UpcomingCarouselProps) => (
  <div className={carouselStyle}>
    <div
      className={carouselTrackStyle}
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      <ScheduleCard latest={true} schedule={schedules[0]} />
      {schedules.slice(1).map((schedule) => (
        <ScheduleCard
          key={schedule.discussionId}
          latest={false}
          schedule={schedule}
        />
      ))}
    </div>
  </div>
);

export default UpcomingCarousel;
