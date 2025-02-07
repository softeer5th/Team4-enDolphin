import GlobalNavBar from '@/routes/@components/GlobalNavBar';
import { LoginLink, MyScheduleLink } from '@/routes/@components/GlobalNavBar/buttons';

const GNB = () => (
  <GlobalNavBar>
    <MyScheduleLink />
    <LoginLink />
  </GlobalNavBar>
);

export default GNB;