   
import type { IconProps } from '../Icon.d.ts';

export const Progress = ({ clickable = false, className, width = 24, height = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg" aria-label="progress icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<mask id="mask0_4590_3525" mask-type='luminance' maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
<rect width="16" height="16" fill="white"/>
</mask>
<g mask="url(#mask0_4590_3525)">
<path fillRule="evenodd" clipRule="evenodd" d="M7.48041 1.14985C7.34289 1.28737 7.26562 1.4739 7.26562 1.66839V3.69639C7.26562 3.89088 7.34289 4.07741 7.48041 4.21494C7.61794 4.35246 7.80447 4.42973 7.99896 4.42973C8.19345 4.42973 8.37998 4.35246 8.5175 4.21494C8.65503 4.07741 8.73229 3.89088 8.73229 3.69639V1.66839C8.73229 1.57209 8.71332 1.47673 8.67647 1.38776C8.63962 1.29879 8.5856 1.21794 8.5175 1.14985C8.44941 1.08175 8.36857 1.02773 8.27959 0.99088C8.19062 0.954027 8.09526 0.935059 7.99896 0.935059C7.80447 0.935059 7.61794 1.01232 7.48041 1.14985Z" fill="#3182F6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M4.67334 5.63578C4.76235 5.6728 4.85781 5.69186 4.95422 5.69186C5.05062 5.69186 5.14608 5.6728 5.23509 5.63578C5.3241 5.59875 5.40492 5.54449 5.47288 5.47612C5.61032 5.3385 5.68752 5.15195 5.68752 4.95745C5.68752 4.76296 5.61032 4.57641 5.47288 4.43879L4.03821 3.00545C3.89852 2.87941 3.71576 2.81182 3.52767 2.81665C3.33958 2.82147 3.16053 2.89835 3.02748 3.03139C2.89444 3.16443 2.81757 3.34349 2.81274 3.53158C2.80792 3.71967 2.8755 3.90243 3.00155 4.04212L4.43488 5.47612H4.43555C4.50351 5.54449 4.58433 5.59875 4.67334 5.63578Z" fill="#3182F6" fillOpacity="0.16"/>
<path fillRule="evenodd" clipRule="evenodd" d="M4.21347 7.48432C4.07595 7.34679 3.88942 7.26953 3.69493 7.26953H1.66693C1.47243 7.26953 1.28591 7.34679 1.14838 7.48432C1.01086 7.62185 0.933594 7.80837 0.933594 8.00286C0.933594 8.19736 1.01086 8.38388 1.14838 8.52141C1.28591 8.65894 1.47243 8.7362 1.66693 8.7362H3.69493C3.88942 8.7362 4.07595 8.65894 4.21347 8.52141C4.351 8.38388 4.42826 8.19736 4.42826 8.00286C4.42826 7.80837 4.351 7.62185 4.21347 7.48432Z" fill="#3182F6" fillOpacity="0.32"/>
<path fillRule="evenodd" clipRule="evenodd" d="M3.0039 11.9605C2.93579 12.0286 2.88176 12.1095 2.8449 12.1985C2.80804 12.2874 2.78906 12.3828 2.78906 12.4792C2.78906 12.5755 2.80804 12.6709 2.8449 12.7599C2.88176 12.8488 2.93579 12.9297 3.0039 12.9978C3.14146 13.1354 3.32803 13.2127 3.52257 13.2127C3.61889 13.2127 3.71428 13.1937 3.80327 13.1568C3.89226 13.12 3.97312 13.0659 4.04123 12.9978L5.47457 11.5645C5.60216 11.4251 5.67106 11.2418 5.6669 11.0528C5.66275 10.8639 5.58587 10.6838 5.45227 10.5501C5.31866 10.4164 5.13864 10.3394 4.94969 10.3351C4.76073 10.3309 4.57741 10.3996 4.4379 10.5272L3.0039 11.9605Z" fill="#3182F6" fillOpacity="0.56"/>
<path fillRule="evenodd" clipRule="evenodd" d="M7.48041 11.7875C7.34289 11.9251 7.26562 12.1116 7.26562 12.3061V14.3341C7.26562 14.5286 7.34289 14.7151 7.48041 14.8526C7.61794 14.9902 7.80447 15.0674 7.99896 15.0674C8.19345 15.0674 8.37998 14.9902 8.5175 14.8526C8.65503 14.7151 8.73229 14.5286 8.73229 14.3341V12.3061C8.73229 12.1116 8.65503 11.9251 8.5175 11.7875C8.37998 11.65 8.19345 11.5728 7.99896 11.5728C7.80447 11.5728 7.61794 11.65 7.48041 11.7875Z" fill="#3182F6" fillOpacity="0.56"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.3267 10.3688C11.2377 10.332 11.1423 10.313 11.046 10.313C10.9497 10.313 10.8543 10.332 10.7653 10.3688C10.6763 10.4057 10.5955 10.4597 10.5273 10.5278C10.4592 10.5959 10.4052 10.6768 10.3683 10.7658C10.3315 10.8548 10.3125 10.9502 10.3125 11.0465C10.3125 11.1428 10.3315 11.2382 10.3683 11.3272C10.4052 11.4162 10.4592 11.497 10.5273 11.5652L11.9613 12.9985C12.0293 13.0668 12.1102 13.121 12.1992 13.158C12.2882 13.1949 12.3836 13.214 12.48 13.214C12.5764 13.214 12.6718 13.1949 12.7608 13.158C12.8498 13.121 12.9307 13.0668 12.9987 12.9985C13.0668 12.9304 13.1209 12.8495 13.1577 12.7605C13.1946 12.6715 13.2136 12.5762 13.2136 12.4798C13.2136 12.3835 13.1946 12.2881 13.1577 12.1991C13.1209 12.1101 13.0668 12.0293 12.9987 11.9612L11.5653 10.5278H11.5647C11.4966 10.4597 11.4157 10.4057 11.3267 10.3688Z" fill="#3182F6" fillOpacity="0.72"/>
<path fillRule="evenodd" clipRule="evenodd" d="M12.3036 7.26953C12.1092 7.26953 11.9226 7.34679 11.7851 7.48432C11.6476 7.62185 11.5703 7.80837 11.5703 8.00286C11.5703 8.19736 11.6476 8.38388 11.7851 8.52141C11.9226 8.65894 12.1092 8.7362 12.3036 8.7362H14.3316C14.5261 8.7362 14.7127 8.65894 14.8502 8.52141C14.9877 8.38388 15.065 8.19736 15.065 8.00286C15.065 7.80837 14.9877 7.62185 14.8502 7.48432C14.7127 7.34679 14.5261 7.26953 14.3316 7.26953H12.3036Z" fill="#3182F6" fillOpacity="0.72"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.5638 5.47768L12.9978 4.04368C13.1271 3.90448 13.1974 3.72056 13.194 3.53059C13.1905 3.34061 13.1135 3.1594 12.9791 3.02504C12.8447 2.89069 12.6635 2.81367 12.4736 2.81018C12.2836 2.80669 12.0997 2.87701 11.9605 3.00634L10.5271 4.43968C10.4247 4.54228 10.3549 4.67295 10.3266 4.81518C10.2983 4.9574 10.3128 5.10482 10.3682 5.23883C10.4236 5.37284 10.5175 5.48743 10.638 5.56814C10.7584 5.64885 10.9001 5.69207 11.0451 5.69234C11.2325 5.69234 11.4205 5.62101 11.5638 5.47768Z" fill="#3182F6" fillOpacity="0.72"/>
</g>
</svg>

    );
};

Progress.displayName = 'Progress';
