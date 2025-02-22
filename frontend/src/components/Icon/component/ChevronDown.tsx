   
import type { IconProps } from '../Icon.d.ts';

export const ChevronDown = ({ clickable = false, className, width = 24, height = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg" aria-label="chevron-down icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<g clipPath="url(#clip0_2682_4812)">
<path d="M10 13.75L3.75 7.5L4.625 6.625L10 12L15.375 6.625L16.25 7.5L10 13.75Z" fill="#8B95A1"/>
</g>
<defs>
<clipPath id="clip0_2682_4812">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

    );
};

ChevronDown.displayName = 'ChevronDown';
