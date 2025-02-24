import { useAtom } from 'jotai';

import { Tab } from '@/components/Tab';
import { tabAtom } from '@/store/discussion';

import DiscussionCalendar from '../DiscussionCalendar';
import DiscussionRank from '../DiscussionRank';
import { tabContainerStyle, tabContentStyle, tabListStyle } from './index.css';

type DiscussionTab = 'calendar' | 'rank';

const DiscussionTab = () => {
  const [tab, setTab] = useAtom(tabAtom);
  const handleChange = (value: DiscussionTab) => {
    setTab(value);
  };

  return (
    <Tab<DiscussionTab>
      className={tabContainerStyle}
      onChange={handleChange}
      selectedValue={tab}
    >
      <Tab.List className={tabListStyle}>
        <Tab.Item value='calendar'>캘린더로 보기</Tab.Item>
        <Tab.Item value='rank'>순위로 보기</Tab.Item>
      </Tab.List>
      <Tab.Content className={tabContentStyle} value='calendar'>
        <DiscussionCalendar />
      </Tab.Content>
      <Tab.Content className={tabContentStyle} value='rank'>
        <DiscussionRank />
      </Tab.Content>
    </Tab>
  );
};

export default DiscussionTab;