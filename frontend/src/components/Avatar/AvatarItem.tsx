import { useState } from 'react';

import type { Size } from '.';
import { avatarItemStyle } from './index.css';

interface AvatarItemProps {
  src: string;
  size?: Size;
  alt?: string;
}

const AvatarItem = ({ src, size = 'sm', alt }: AvatarItemProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const fallbackSrc = 'https://picsum.photos/id/200/200/200';
  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      alt={alt || `Avatar image ${imgSrc}`}
      className={avatarItemStyle({ size })}
      loading='lazy'
      onError={handleError}
      src={imgSrc}
    />
  );
};

export default AvatarItem;
