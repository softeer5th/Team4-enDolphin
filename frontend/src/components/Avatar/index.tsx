import clsx from '@/utils/clsx';

import AvatarCount from './AvatarCount';
import AvatarItem from './AvatarItem';
import { avatarContainerStyle } from './index.css';

export type Size = 'sm' | 'lg';

interface AvatarProps {
  size: Size;
  imageUrls: string[];
  className?: string;
}

const MAX_IMAGE_COUNT = 4;

const Avatar = ({ size, imageUrls, className }: AvatarProps) => {
  const ENTIRE_LENGTH = imageUrls.length;
  const limitedUrls = imageUrls.slice(0, MAX_IMAGE_COUNT);

  return (
    <div className={clsx(avatarContainerStyle, className)}>
      {limitedUrls.map((url, index) => (
        <AvatarItem
          key={`${index}-${url}`}
          size={size}
          src={url}
        />
      ))}
      {ENTIRE_LENGTH > MAX_IMAGE_COUNT && (
        <AvatarCount
          count={ENTIRE_LENGTH}
          size={size}
        />
      )}
    </div>
  );
};

export default Avatar;