   
import type { IconProps } from '../Icon.d.ts';

export const Calendar = ({ clickable = false, className, width = 24, height = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 134 130"  xmlns="http://www.w3.org/2000/svg" aria-label="calendar icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<path d="M7.31641 35.8613L126.86 46.32L120.236 122.031C119.851 126.432 115.971 129.688 111.569 129.303L7.96488 120.239C3.56342 119.854 0.307496 115.974 0.692574 111.572L7.31641 35.8613Z" fill="#E5E8EE"/>
<path d="M7.83984 29.8867L127.383 40.3454L120.759 116.056C120.374 120.458 116.494 123.714 112.093 123.328L8.48832 114.264C4.08685 113.879 0.830933 109.999 1.21601 105.597L7.83984 29.8867Z" fill="url(#paint0_linear_2090_22914)"/>
<g filter="url(#filter0_d_2090_22914)">
<path d="M9.23244 13.9471C9.61752 9.54563 13.4978 6.28971 17.8992 6.67479L121.503 15.739C125.905 16.1241 129.161 20.0043 128.776 24.4058L127.381 40.3449L7.83795 29.8862L9.23244 13.9471Z" fill="url(#paint1_linear_2090_22914)"/>
</g>
<circle cx="32.9224" cy="18.5293" r="3" transform="rotate(5 32.9224 18.5293)" fill="#3182F6"/>
<circle cx="56.8326" cy="20.6202" r="3" transform="rotate(5 56.8326 20.6202)" fill="#3182F6"/>
<circle cx="80.7427" cy="22.7129" r="3" transform="rotate(5 80.7427 22.7129)" fill="#3182F6"/>
<circle cx="104.649" cy="24.8038" r="3" transform="rotate(5 104.649 24.8038)" fill="#3182F6"/>
<rect x="31.9727" y="1.88086" width="4.8" height="18" rx="2.4" transform="rotate(5 31.9727 1.88086)" fill="url(#paint2_linear_2090_22914)"/>
<rect x="55.8789" y="3.97266" width="4.8" height="18" rx="2.4" transform="rotate(5 55.8789 3.97266)" fill="url(#paint3_linear_2090_22914)"/>
<rect x="79.7891" y="6.06543" width="4.8" height="18" rx="2.4" transform="rotate(5 79.7891 6.06543)" fill="url(#paint4_linear_2090_22914)"/>
<rect x="103.695" y="8.15625" width="4.8" height="18" rx="2.4" transform="rotate(5 103.695 8.15625)" fill="url(#paint5_linear_2090_22914)"/>
<path d="M12.5369 38.1272C12.6524 36.8068 13.8165 35.83 15.137 35.9455L42.6319 38.351C43.9524 38.4665 44.9291 39.6306 44.8136 40.951L42.3035 69.6414C42.188 70.9619 41.0239 71.9386 39.7035 71.8231L12.2085 69.4176C10.8881 69.3021 9.91131 68.138 10.0268 66.8176L12.5369 38.1272Z" fill="white"/>
<path d="M50.7908 41.474C50.9063 40.1535 52.0704 39.1768 53.3908 39.2923L80.8858 41.6978C82.2062 41.8133 83.183 42.9774 83.0675 44.2978L80.5574 72.9882C80.4419 74.3086 79.2778 75.2854 77.9574 75.1699L50.4624 72.7644C49.1419 72.6489 48.1652 71.4848 48.2807 70.1644L50.7908 41.474Z" fill="white"/>
<path d="M89.0446 44.8208C89.1602 43.5003 90.3242 42.5235 91.6447 42.6391L119.14 45.0446C120.46 45.1601 121.437 46.3242 121.321 47.6446L118.811 76.335C118.696 77.6554 117.532 78.6322 116.211 78.5167L88.7163 76.1112C87.3958 75.9957 86.419 74.8316 86.5346 73.5111L89.0446 44.8208Z" fill="white"/>
<path d="M9.08555 77.5765C9.20108 76.256 10.3652 75.2793 11.6856 75.3948L39.1806 77.8003C40.501 77.9158 41.4778 79.0799 41.3622 80.4003L38.8522 109.091C38.7366 110.411 37.5726 111.388 36.2521 111.272L8.75716 108.867C7.43672 108.751 6.45995 107.587 6.57547 106.267L9.08555 77.5765Z" fill="white"/>
<path d="M47.3394 80.9233C47.4549 79.6028 48.619 78.626 49.9395 78.7416L77.4344 81.1471C78.7549 81.2626 79.7316 82.4267 79.6161 83.7471L77.106 112.437C76.9905 113.758 75.8264 114.735 74.506 114.619L47.011 112.214C45.6906 112.098 44.7138 110.934 44.8293 109.614L47.3394 80.9233Z" fill="white"/>
<path d="M85.5933 84.27C85.7088 82.9496 86.8729 81.9728 88.1933 82.0884L115.688 84.4938C117.009 84.6094 117.985 85.7734 117.87 87.0939L115.36 115.784C115.244 117.105 114.08 118.081 112.76 117.966L85.2649 115.56C83.9445 115.445 82.9677 114.281 83.0832 112.96L85.5933 84.27Z" fill="white"/>
<defs>
<filter id="filter0_d_2090_22914" x="2.83984" y="5.64355" width="130.969" height="43.7012" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2090_22914"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2090_22914" result="shape"/>
</filter>
<linearGradient id="paint0_linear_2090_22914" x1="67.5871" y1="35.395" x2="37.4087" y2="109.805" gradientUnits="userSpaceOnUse">
<stop stopColor="#DFE2E6"/>
<stop offset="1" stopColor="#F9FAFB"/>
</linearGradient>
<linearGradient id="paint1_linear_2090_22914" x1="69.7013" y1="11.2069" x2="67.6096" y2="35.1155" gradientUnits="userSpaceOnUse">
<stop stopColor="#64A8FF"/>
<stop offset="1" stopColor="#3182F6"/>
</linearGradient>
<linearGradient id="paint2_linear_2090_22914" x1="34.3727" y1="1.88086" x2="34.3727" y2="19.8809" gradientUnits="userSpaceOnUse">
<stop stopColor="#4E5968"/>
<stop offset="1" stopColor="#6B7684"/>
</linearGradient>
<linearGradient id="paint3_linear_2090_22914" x1="58.2789" y1="3.97266" x2="58.2789" y2="21.9726" gradientUnits="userSpaceOnUse">
<stop stopColor="#4E5968"/>
<stop offset="1" stopColor="#6B7684"/>
</linearGradient>
<linearGradient id="paint4_linear_2090_22914" x1="82.1891" y1="6.06543" x2="82.1891" y2="24.0654" gradientUnits="userSpaceOnUse">
<stop stopColor="#4E5968"/>
<stop offset="1" stopColor="#6B7684"/>
</linearGradient>
<linearGradient id="paint5_linear_2090_22914" x1="106.095" y1="8.15625" x2="106.095" y2="26.1562" gradientUnits="userSpaceOnUse">
<stop stopColor="#4E5968"/>
<stop offset="1" stopColor="#6B7684"/>
</linearGradient>
</defs>
</svg>

    );
};

Calendar.displayName = 'Calendar';
