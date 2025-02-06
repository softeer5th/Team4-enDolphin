interface ImageProps {
  src: string;
  alt: string;
  isLazy?: boolean;
  className?: string;
}

const BREAKPOINTS = [480, 768, 1280];
const SIZES = `
(max-width: 480px) 480px,
(max-width: 768px) 768px,
(max-width: 1280px) 1280px,
(min-width: 1281px) 1920px
`;

export const Image = ({ src, alt, isLazy = false, className }: ImageProps) => {
  const BASE_PATH = src.split('.')[0];
  const createSrcSet = () =>
    BREAKPOINTS
      .map((width) => `${BASE_PATH}-${width}w.webp ${width}w`)
      .join(', ');

  return (
    <img
      alt={alt}
      className={className}
      loading={isLazy ? 'lazy' : 'eager'}
      sizes={SIZES}
      src={src}
      srcSet={`${createSrcSet()}, ${src} 1920w`}
    />
  );
};