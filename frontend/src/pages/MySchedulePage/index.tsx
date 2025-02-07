import { SchedulePopover } from '@/features/my-schedule/ui/SchedulePopover';
import GlobalNavBar from '@/layout/GlobalNavBar';
import { LoginLink, MyScheduleLink } from '@/layout/GlobalNavBar/buttons';

const MySchedulePage = () => 
  <>
    <GlobalNavBar>
      <MyScheduleLink />
      <LoginLink />
    </GlobalNavBar>
    <SchedulePopover isOpen={true} type='edit' />
  </>;

export default MySchedulePage;