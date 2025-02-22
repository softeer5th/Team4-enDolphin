   
import type { IconProps } from '../Icon.d.ts';

export const ArrowLeft = ({ clickable = false, className, width = 24, height = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="arrow-left icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<mask id="mask0_732_173" mask-type='luminance' maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="white"/>
</mask>
<g mask="url(#mask0_732_173)">
<path fillRule="evenodd" clipRule="evenodd" d="M14.8585 19.9972C14.6948 19.9292 14.5461 19.8296 14.421 19.704L7.67101 12.954C7.54561 12.8286 7.44613 12.6798 7.37826 12.516C7.31039 12.3522 7.27545 12.1766 7.27545 11.9993C7.27545 11.8219 7.31039 11.6464 7.37826 11.4825C7.44613 11.3187 7.54561 11.1699 7.67101 11.0445L14.421 4.29451C14.5454 4.16478 14.6944 4.0612 14.8594 3.98983C15.0243 3.91846 15.2018 3.88074 15.3815 3.87889C15.5612 3.87703 15.7395 3.91108 15.9059 3.97903C16.0723 4.04698 16.2234 4.14747 16.3504 4.2746C16.4775 4.40173 16.5778 4.55294 16.6457 4.71937C16.7135 4.8858 16.7474 5.0641 16.7454 5.24381C16.7434 5.42351 16.7055 5.60101 16.634 5.7659C16.5625 5.93078 16.4588 6.07973 16.329 6.20401L10.5345 12L16.329 17.7945C16.5181 17.9832 16.6469 18.2238 16.6992 18.4858C16.7515 18.7477 16.7249 19.0193 16.6227 19.2662C16.5206 19.513 16.3475 19.724 16.1254 19.8724C15.9033 20.0209 15.6422 20.1001 15.375 20.1C15.1978 20.1001 15.0222 20.0652 14.8585 19.9972Z" fill="#8B95A1"/>
</g>
</svg>

    );
};

ArrowLeft.displayName = 'ArrowLeft';
