   
import type { IconProps } from '../Icon.d.ts';

export const CircleCheck = ({ clickable = false, className, width = 24, height = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="circle-check icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<mask id="mask0_787_13421" mask-type='luminance' maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="white"/>
</mask>
<g mask="url(#mask0_787_13421)">
<path fillRule="evenodd" clipRule="evenodd" d="M11.6235 15.7988C11.4354 15.9856 11.1811 16.0904 10.916 16.0904C10.6509 16.0904 10.3966 15.9856 10.2085 15.7988L6.79251 12.3828C6.69967 12.2899 6.62602 12.1797 6.57577 12.0584C6.52552 11.9371 6.49966 11.8071 6.49966 11.6758C6.49966 11.4106 6.605 11.1563 6.79251 10.9688C6.98002 10.7812 7.23434 10.6759 7.49951 10.6759C7.76469 10.6759 8.019 10.7812 8.20651 10.9688L10.9155 13.6778L15.7925 8.80076C15.8854 8.70791 15.9956 8.63426 16.1169 8.58402C16.2382 8.53377 16.3682 8.50791 16.4995 8.50791C16.6308 8.50791 16.7608 8.53377 16.8821 8.58402C17.0034 8.63426 17.1137 8.70791 17.2065 8.80076C17.2994 8.8936 17.373 9.00382 17.4233 9.12513C17.4735 9.24644 17.4994 9.37645 17.4994 9.50776C17.4994 9.63906 17.4735 9.76907 17.4233 9.89038C17.373 10.0117 17.2994 10.1219 17.2065 10.2148L11.6235 15.7988ZM0.999512 11.9998C0.999512 18.0748 5.92451 22.9998 11.9995 22.9998C18.0745 22.9998 22.9995 18.0748 22.9995 11.9998C22.9995 5.92476 18.0745 0.999756 11.9995 0.999756C5.92451 0.999756 0.999512 5.92476 0.999512 11.9998Z" fill="#4593FC"/>
</g>
</svg>

    );
};

CircleCheck.displayName = 'CircleCheck';
