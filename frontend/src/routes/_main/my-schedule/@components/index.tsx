import { Outlet } from '@tanstack/react-router';

import GlobalNavBar from '@/routes/@components/GlobalNavBar';
import { LoginLink, MyScheduleLink } from '@/routes/@components/GlobalNavBar/buttons';

import { SchedulePopover } from './SchedulePopover';

const MySchedule = () => 
  <>
    <GlobalNavBar>
      <MyScheduleLink />
      <LoginLink />
      <Outlet />
    </GlobalNavBar>
    <SchedulePopover isOpen={true} type='edit' />
  </>;

export default MySchedule;
