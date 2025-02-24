   
import type { IconProps } from '../Icon.d.ts';

export const PinLocation = ({ clickable = false, className, width = 24, height = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="pin-location icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<mask id="mask0_732_606" mask-type='luminance' maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="white"/>
</mask>
<g mask="url(#mask0_732_606)">
<path fillRule="evenodd" clipRule="evenodd" d="M10.9455 12.5506C10.6102 12.4174 10.3049 12.2186 10.0473 11.9659C9.78976 11.7133 9.58516 11.4118 9.44549 11.0791C9.30583 10.7465 9.23389 10.3893 9.23389 10.0285C9.23389 9.66772 9.30583 9.31055 9.44549 8.97789C9.58516 8.64523 9.78976 8.34375 10.0473 8.09109C10.3049 7.83843 10.6102 7.63967 10.9455 7.50641C11.2808 7.37315 11.6393 7.30809 12 7.31501C12.7106 7.32865 13.3876 7.62054 13.8853 8.12793C14.3831 8.63532 14.6619 9.31773 14.6619 10.0285C14.6619 10.7393 14.3831 11.4217 13.8853 11.9291C13.3876 12.4365 12.7106 12.7284 12 12.742C11.6393 12.7489 11.2808 12.6839 10.9455 12.5506ZM9.87599 1.03701C5.60599 1.99001 2.61198 6.00901 2.77998 10.381C2.91198 13.815 5.01898 16.887 11.288 22.914C11.684 23.294 12.318 23.296 12.715 22.915C19.199 16.682 21.231 13.61 21.231 10.028C21.231 4.23801 15.898 0.306989 9.87599 1.03801" fill="#8B95A1"/>
</g>
</svg>

    );
};

PinLocation.displayName = 'PinLocation';
