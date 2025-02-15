
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { vars } from '@/theme/index.css';

import { chipAbleContainerStyle, dotStyle } from './chipAble.css';

const ChipAble = ({ isAdjustable }: { isAdjustable: boolean }) => (
  <Flex
    align='center'
    className={chipAbleContainerStyle({ isAdjustable })}
  >
    <div className={dotStyle({ isAdjustable })} />
    {isAdjustable ?
      <Text color={vars.color.Ref.Primary[500]} typo='caption'>조정 가능</Text>
      :
      <Text color={vars.color.Ref.Red[500]} typo='caption'>조정 불가능</Text>}
  </Flex>  
);

export default ChipAble;