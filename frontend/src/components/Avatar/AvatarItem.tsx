import type { Size } from '.';
import { avatarItemStyle } from './index.css';

interface AvatarItemProps {
  src: string;
  alt: string;
  size: Size;
}

const AvatarItem = ({ size }: AvatarItemProps) => (
  <div className={avatarItemStyle({ size })}>
  </div>
  // TODO: 외부에서 이미지 주입
  // <img
  //   alt={alt}
  //   className={avatarItemStyle({ size })}
  //   src={src}
  // />
);

export default AvatarItem;