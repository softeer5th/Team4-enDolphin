import ScheduleCard from '../ScheduleCard';
import { carouselStyle } from './UpcomingCarousel.css';

interface UpcomingCarouselProps {
  schedules: object[];
}

const UpcomingCarousel = ({ schedules }: UpcomingCarouselProps) => (
  <div className={carouselStyle}>
    {schedules.map((schedule, index) => (
      <ScheduleCard key={`${schedule}-${index}`} selected={false} />
    ))}
  </div>
);

export default UpcomingCarousel;