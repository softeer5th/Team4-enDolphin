   
import type { IconProps } from '../Icon.d.ts';

export const ChevronLeft = ({ clickable = false, className, width = 24, height = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="chevron-left icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<path d="M14.3727 8.04134L10.412 11.9893L14.3481 15.9627C14.7367 16.3553 14.7347 16.988 14.3421 17.3767C14.1474 17.57 13.8927 17.6667 13.6381 17.6667C13.3807 17.6667 13.1234 17.568 12.9281 17.3707L8.29006 12.6893C7.90206 12.2973 7.9034 11.6667 8.29406 11.2773L12.9607 6.62534C13.3507 6.23534 13.9854 6.23601 14.3747 6.62734C14.7647 7.01868 14.7633 7.65201 14.3727 8.04134Z" fill="#6B7684"/>
</svg>

    );
};

ChevronLeft.displayName = 'ChevronLeft';
