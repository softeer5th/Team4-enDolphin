import GNB from './GNB';
import { SchedulePopover } from './SchedulePopover';

const MySchedule = () => 
  <>
    <GNB />
    <SchedulePopover isOpen={true} type='edit' />
  </>;

export default MySchedule;
