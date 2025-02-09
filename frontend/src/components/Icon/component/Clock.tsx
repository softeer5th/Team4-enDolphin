   
import type { IconProps } from '../Icon.d.ts';

export const Clock = ({ clickable = false, className, width = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="clock icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<mask id="mask0_732_837" mask-type='luminance' maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="white"/>
</mask>
<g mask="url(#mask0_732_837)">
<path fillRule="evenodd" clipRule="evenodd" d="M12.981 11.855C12.9754 11.9227 12.9616 11.9895 12.94 12.054C12.9038 12.1736 12.8447 12.285 12.766 12.382C12.722 12.435 12.676 12.482 12.622 12.526C12.597 12.546 12.582 12.575 12.555 12.593L7.829 15.743C7.60832 15.8846 7.34086 15.9338 7.08423 15.8801C6.8276 15.8264 6.60233 15.6741 6.45692 15.4559C6.31152 15.2377 6.25761 14.9712 6.30682 14.7136C6.35602 14.4561 6.5044 14.2282 6.72 14.079L11 11.226V6.556C11 6.29078 11.1054 6.03643 11.2929 5.84889C11.4804 5.66136 11.7348 5.556 12 5.556C12.2652 5.556 12.5196 5.66136 12.7071 5.84889C12.8946 6.03643 13 6.29078 13 6.556V11.761C13 11.794 12.984 11.823 12.981 11.855ZM1.5 12C1.5 17.799 6.201 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.201 17.799 1.5 12 1.5C6.201 1.5 1.5 6.201 1.5 12Z" fill={fill}/>
</g>
</svg>

    );
};

Clock.displayName = 'Clock';
