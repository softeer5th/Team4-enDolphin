   
import type { IconProps } from '../Icon.d.ts';

export const Check = ({ className, width = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="check icon" fill="none" className={className} {...rest}>
<mask id="mask0_1002_7989" mask-type='luminance' maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill={fill}/>
</mask>
<g mask="url(#mask0_1002_7989)">
<path d="M9.80001 16.8L5.20001 12.2C4.70001 11.7 4.70001 11 5.20001 10.5C5.70001 10 6.40001 10 6.90001 10.5L10.6 14.2L17.2 7.60004C17.7 7.10004 18.4 7.10004 18.9 7.60004C19.4 8.10004 19.4 8.80004 18.9 9.30004L11.5 16.7C11.2 17.1 10.9 17.2 10.6 17.2V17.2C10.3 17.2 10 17.1 9.80001 16.8Z" fill={fill}/>
</g>
</svg>

    );
};

Check.displayName = 'Check';
