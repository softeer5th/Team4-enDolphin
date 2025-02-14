import { Flex } from '@/components/Flex';
import { Close } from '@/components/Icon';
import { vars } from '@/theme/index.css';

import type { CandidateScheduleGetResponse } from '../../model';
import { mockedCandidateScheduleGetResponse } from '../../model';
import Header from './Header';
import { backdropStyle, containerStyle, contentContainerStyle, topBarStyle } from './index.css';
import MainContent from './MainContent';

// TODO: 라우팅 param 정의 위치 옮기기
interface CandidateScheduleDetailParams {
  adjustCount: number;
  startTime: Date;
  endTime: Date;
}

const CandidateScheduleDetail = () => {
  const mockData = mockedCandidateScheduleGetResponse;
  const params = {
    adjustCount: 1,
    startTime: mockData.startDateTime,
    endTime: mockData.endDateTime,
  };
  return (
    <>
      <div className={backdropStyle} />
      <Flex className={containerStyle} direction='column'>
        <TopBar />
        <Content
          {...mockData}
          {...params}
        />
      </Flex>
    </>
  );
};

const TopBar = () => (
  <Flex
    align='center'
    className={topBarStyle}
    justify='flex-end'
  >
    <Close
      clickable
      fill={vars.color.Ref.Netural[500]}
      width={24}
    />
  </Flex>
);

const Content = ({ ...props }: CandidateScheduleGetResponse & CandidateScheduleDetailParams) => (
  <Flex
    className={contentContainerStyle}
    direction='column'
    justify='flex-start'
    width='full'
  >
    <Header {...props} />
    <MainContent {...props} />
  </Flex>
);

export default CandidateScheduleDetail;
