import { Outlet } from '@tanstack/react-router';

import { Flex } from '@/components/Flex';
import GlobalNavBar from '@/routes/@components/GlobalNavBar';
import { LoginLink, MyScheduleLink } from '@/routes/@components/GlobalNavBar/buttons';

import { SchedulePopover } from './SchedulePopover';

const MySchedule = () => 
  <div style={{}}>
    <GlobalNavBar>
      <MyScheduleLink />
      <LoginLink />
      <Outlet />
    </GlobalNavBar>
    <SchedulePopover isOpen={true} type='edit' />
    <Flex width={2000}>TEST</Flex>
  </div>;

export default MySchedule;
