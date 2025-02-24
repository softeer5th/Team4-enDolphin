import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Flex';

import { MyDatePicker } from '../MyDatePicker';
import { sideBarStyle } from './index.css';

const SideBar = () => (
  <Flex
    className={sideBarStyle}
    direction='column'
    gap={400}
    justify='flex-start'
    width='17.75rem'
  >
    <MyDatePicker />
    <Divider />
  </Flex>
);

export default SideBar;