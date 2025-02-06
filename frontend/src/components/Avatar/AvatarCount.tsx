import { Text } from '../Text';
import type { Size } from '.';
import { avatarItemStyle } from './index.css';

interface AvatarCountProps {
  size: Size;
  count: number;
}

const AvatarCount = ({ size, count }: AvatarCountProps) => (
  <div className={avatarItemStyle({ size })}>
    <Text typo='caption'>{count}</Text>
  </div>
);

export default AvatarCount;