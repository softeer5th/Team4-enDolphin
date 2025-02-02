   
import type { IconProps } from '../Icon.d.ts';

export const IconDotsMono = ({ className, width = 20 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="icon-dots-mono icon" fill="none" className={className} {...rest}>
<mask id="mask0_732_481" mask-type='luminance' maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="white"/>
</mask>
<g mask="url(#mask0_732_481)">
<path fillRule="evenodd" clipRule="evenodd" d="M4.46446 13.8476C4.22177 13.747 4.00128 13.5995 3.81556 13.4137C3.62984 13.2279 3.48254 13.0074 3.38207 12.7646C3.28159 12.5219 3.22991 12.2617 3.22998 11.999C3.23005 11.7363 3.28186 11.4762 3.38245 11.2335C3.48305 10.9908 3.63046 10.7703 3.81627 10.5846C4.00208 10.3989 4.22265 10.2516 4.46538 10.1511C4.70812 10.0506 4.96827 9.99896 5.23098 9.99902C5.76155 9.99916 6.27033 10.21 6.6454 10.5853C7.02047 10.9606 7.23111 11.4695 7.23098 12C7.23085 12.5306 7.01995 13.0394 6.64469 13.4144C6.26943 13.7895 5.76055 14.0002 5.22998 14C4.96727 14 4.70715 13.9481 4.46446 13.8476ZM10.5868 13.4142C10.2117 13.0392 10.001 12.5305 10.001 12C10.001 11.4696 10.2117 10.9609 10.5868 10.5858C10.9618 10.2107 11.4705 10 12.001 10C12.5314 10 13.0401 10.2107 13.4152 10.5858C13.7903 10.9609 14.001 11.4696 14.001 12C14.001 12.5305 13.7903 13.0392 13.4152 13.4142C13.0401 13.7893 12.5314 14 12.001 14C11.4705 14 10.9618 13.7893 10.5868 13.4142ZM18.0055 13.8476C17.7628 13.747 17.5423 13.5995 17.3566 13.4137C17.1708 13.2279 17.0235 13.0074 16.9231 12.7646C16.8226 12.5219 16.7709 12.2617 16.771 11.999C16.771 11.7363 16.8229 11.4762 16.9235 11.2335C17.024 10.9908 17.1715 10.7703 17.3573 10.5846C17.5431 10.3989 17.7636 10.2516 18.0064 10.1511C18.2491 10.0506 18.5093 9.99896 18.772 9.99902C19.3025 9.99916 19.8113 10.21 20.1864 10.5853C20.5615 10.9606 20.7721 11.4695 20.772 12C20.7718 12.5306 20.561 13.0394 20.1857 13.4144C19.8104 13.7895 19.3015 14.0002 18.771 14C18.5083 14 18.2481 13.9481 18.0055 13.8476Z" fill={fill}/>
</g>
</svg>

    );
};

IconDotsMono.displayName = 'IconDotsMono';
