   
import type { IconProps } from '../Icon.d.ts';

export const Plus = ({ clickable = false, className, width = 24, height = 24 , stroke = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="plus icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<path d="M12 4.5V19.5M19.5 12H4.5" stroke="#6B7684" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

    );
};

Plus.displayName = 'Plus';
