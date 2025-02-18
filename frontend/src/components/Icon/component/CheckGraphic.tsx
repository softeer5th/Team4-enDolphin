   
import type { IconProps } from '../Icon.d.ts';

export const CheckGraphic = ({ clickable = false, className, width = 24, height = 24 , stroke = "white", fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 180 180"  xmlns="http://www.w3.org/2000/svg" aria-label="check-graphic icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<g clipPath="url(#clip0_894_193)">
<mask id="mask0_894_193" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
<rect width="180" height="180" fill="white"/>
</mask>
<g mask="url(#mask0_894_193)">
<rect width="180" height="180" fill="#F3F6FC"/>
<g filter="url(#filter0_f_894_193)">
<circle cx="115.2" cy="88.2" r="27" fill="#90C2FF"/>
</g>
<g filter="url(#filter1_f_894_193)">
<ellipse cx="46.35" cy="132.3" rx="14.85" ry="27" fill="#76E4B8"/>
</g>
<g filter="url(#filter2_d_894_193)">
<rect x="77.8491" y="65.25" width="72" height="72" rx="16" transform="rotate(10 77.8491 65.25)" fill="white"/>
<rect x="78.2547" y="65.8292" width="71" height="71" rx="15.5" transform="rotate(10 78.2547 65.8292)" stroke="#E5E8EB"/>
</g>
<mask id="mask1_894_193" mask-type='luminance' maskUnits="userSpaceOnUse" x="78" y="78" width="58" height="58">
<rect x="87.3398" y="78.8045" width="48.6" height="48.6" transform="rotate(10 87.3398 78.8045)" fill="white"/>
</mask>
<g mask="url(#mask1_894_193)">
<path d="M100.976 115.754L93.4197 104.963C92.5984 103.79 92.8446 102.394 94.0175 101.573C95.1904 100.751 96.5864 100.998 97.4077 102.17L103.485 110.85L118.968 100.009C120.141 99.1877 121.537 99.4339 122.358 100.607C123.18 101.78 122.933 103.176 121.76 103.997L104.401 116.152C103.662 116.844 103.029 116.938 102.43 116.833C101.832 116.727 101.269 116.422 100.976 115.754Z" fill="url(#paint0_linear_894_193)"/>
</g>
</g>
</g>
<defs>
<filter id="filter0_f_894_193" x="11.8" y="38.8" width="254" height="254" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_894_193"/>
</filter>
<filter id="filter1_f_894_193" x="38.5" y="35.3" width="169.7" height="194" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="35" result="effect1_foregroundBlur_894_193"/>
</filter>
<filter id="filter2_d_894_193" x="47.8791" y="47.7826" width="118.344" height="118.344" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="10"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_894_193"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_894_193" result="shape"/>
</filter>
<linearGradient id="paint0_linear_894_193" x1="108.83" y1="97.4502" x2="105.322" y2="117.343" gradientUnits="userSpaceOnUse">
<stop stopColor="#64A8FF"/>
<stop offset="1" stopColor="#3182F6"/>
</linearGradient>
<clipPath id="clip0_894_193">
<rect width="180" height="180" rx="90" fill="white"/>
</clipPath>
</defs>
</svg>

    );
};

CheckGraphic.displayName = 'CheckGraphic';
