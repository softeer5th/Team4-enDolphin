   
import type { IconProps } from '../Icon.d.ts';

export const ClockGraphic = ({ clickable = false, className, width = 24, height = 24 , stroke = "white", fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 200 200"  xmlns="http://www.w3.org/2000/svg" aria-label="clock-graphic icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<circle cx="100" cy="100" r="100" fill="url(#paint0_linear_894_208)"/>
<circle cx="100" cy="100.5" r="75" fill="url(#paint1_radial_894_208)"/>
<rect x="104.158" y="98.5" width="8" height="66" rx="4" transform="rotate(120 104.158 98.5)" fill="#4E5968"/>
<rect x="99.6569" y="106.512" width="8" height="50" rx="4" transform="rotate(-135 99.6569 106.512)" fill="#4E5968"/>
<rect x="98" y="100" width="4" height="60" rx="2" fill="#4593FC"/>
<circle cx="100" cy="100.5" r="10" fill="white" stroke="#E5E8EB" strokeWidth="4"/>
<defs>
<linearGradient id="paint0_linear_894_208" x1="-1.8593e-06" y1="10.0503" x2="192.95" y2="206.91" gradientUnits="userSpaceOnUse">
<stop stopColor="#D1D6DB"/>
<stop offset="1" stopColor="#F2F4F6"/>
</linearGradient>
<radialGradient id="paint1_radial_894_208" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100.5) rotate(90) scale(75)">
<stop offset="0.709" stopColor="white"/>
<stop offset="1" stopColor="#F1F1F1"/>
</radialGradient>
</defs>
</svg>

    );
};

ClockGraphic.displayName = 'ClockGraphic';
