import { vars } from '@/theme/index.css';

import { Flex } from '../Flex';
import type { Typo } from '../Text';
import { Text } from '../Text';
import type { Size } from '.';
import { avatarItemStyle } from './index.css';

interface AvatarCountProps {
  size: Size;
  count: number;
}

const AvatarCount = ({ size, count }: AvatarCountProps) => (
  <Flex
    align='center'
    className={avatarItemStyle({ size })}
    justify='center'
  >
    <Text color={vars.color.Ref.Netural[500]} typo={getTypo(size)}>{count}</Text>
  </Flex>
);

const getTypo = (size: Size): Typo => 
  size === 'sm' ? 'caption' : 't3';

export default AvatarCount;