import Button from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Close } from '@/components/Icon';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';
import { formatTimeToColonString } from '@/utils/date/format';

import type { CandidateScheduleGetResponse } from '../../model';
import { mockedCandidateScheduleGetResponse } from '../../model';
import Header from './Header';
import { backdropStyle, containerStyle, contentContainerStyle, topBarStyle } from './index.css';

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
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
  };
  return (
    <>
      <div className={backdropStyle} />
      <Flex className={containerStyle} direction='column'>
        <TopBar />
        <Content {...mockData} {...params} />
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
    <Close fill={vars.color.Ref.Netural[500]} width={24} />
  </Flex>
);

const Content = ({ ...props }: CandidateScheduleGetResponse & CandidateScheduleDetailParams) => (
  <Flex className={contentContainerStyle} width='full'>
    <Header {...props} />
  </Flex>
);

export default CandidateScheduleDetail;
