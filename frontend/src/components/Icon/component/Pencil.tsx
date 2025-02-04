   
import type { IconProps } from '../Icon.d.ts';

export const Pencil = ({ className, width = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="pencil icon" fill="none" className={className} {...rest}>
<mask id="mask0_730_15520" mask-type='luminance' maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="white"/>
</mask>
<g mask="url(#mask0_730_15520)">
<path fillRule="evenodd" clipRule="evenodd" d="M3.27288 14.516L2.03688 19.126L1.22388 22.163C1.2013 22.2478 1.20142 22.3371 1.22421 22.4219C1.24701 22.5067 1.29169 22.584 1.35377 22.6461C1.41586 22.7082 1.49317 22.7528 1.57796 22.7756C1.66275 22.7984 1.75204 22.7985 1.83688 22.776L4.87189 21.962L9.48288 20.726H9.48388L18.5459 11.664L12.3359 5.45396H12.3349L3.27288 14.516ZM22.2929 6.50399L17.4969 1.70699C17.4041 1.61404 17.2939 1.54031 17.1726 1.48999C17.0513 1.43968 16.9212 1.41379 16.7899 1.41379C16.6586 1.41379 16.5285 1.43968 16.4072 1.48999C16.2859 1.54031 16.1757 1.61404 16.0829 1.70699L13.6079 4.18099L19.8189 10.392L22.2929 7.91699C22.3858 7.8242 22.4596 7.714 22.5099 7.59268C22.5602 7.47137 22.5861 7.34132 22.5861 7.20999C22.5861 7.07866 22.5602 6.94861 22.5099 6.8273C22.4596 6.70598 22.3858 6.59578 22.2929 6.50299" fill={fill}/>
</g>
</svg>

    );
};

Pencil.displayName = 'Pencil';
