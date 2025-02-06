import AvatarCount from './AvatarCount';
import AvatarItem from './AvatarItem';
import { avatarContainerStyle } from './index.css';

export type Size = 'sm' | 'lg';

interface AvatarProps {
  size: Size;
  imageUrls: string[];
}

const MAX_IMAGE_COUNT = 4;

const Avatar = ({ size, imageUrls: prevUrls }: AvatarProps) => {
  let limitedUrls = prevUrls;
  if (prevUrls.length > MAX_IMAGE_COUNT) {
    limitedUrls = prevUrls.slice(0, MAX_IMAGE_COUNT);
  }

  return (
    <div className={avatarContainerStyle}>
      {limitedUrls.map((url, index) => (
        <AvatarItem
          alt=''
          key={`${index}-${url}`}
          size={size}
          src={url}
        />
      ))}
      {prevUrls.length > MAX_IMAGE_COUNT && (
        <AvatarCount
          count={prevUrls.length}
          size={size}
        />
      )}
    </div>
  );
};

export default Avatar;