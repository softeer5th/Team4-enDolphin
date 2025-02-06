import type { Size } from '.';
import { avatarItemStyle } from './index.css';

interface AvatarItemProps {
  src: string;
  alt: string;
  size: Size;
}

const AvatarItem = ({ src, size, alt }: AvatarItemProps) => (
  <img
    alt={alt}
    className={avatarItemStyle({ size })}
    src={src}
  />
);

export default AvatarItem;
