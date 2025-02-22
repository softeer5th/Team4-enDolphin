   
import type { IconProps } from '../Icon.d.ts';

export const Google = ({ clickable = false, className, width = 24, height = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={height || width} viewBox="0 0 24 23"  xmlns="http://www.w3.org/2000/svg" aria-label="google icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<path fillRule="evenodd" clipRule="evenodd" d="M23.04 11.7615C23.04 10.946 22.9668 10.1619 22.8309 9.40918H12V13.8576H18.1891C17.9225 15.2951 17.1123 16.513 15.8943 17.3285V20.214H19.6109C21.7855 18.2119 23.04 15.2637 23.04 11.7615Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.9995 23.0001C15.1045 23.0001 17.7077 21.9703 19.6104 20.2139L15.8938 17.3285C14.864 18.0185 13.5467 18.4262 11.9995 18.4262C9.00425 18.4262 6.46902 16.4032 5.5647 13.6851H1.72266V16.6646C3.61493 20.423 7.50402 23.0001 11.9995 23.0001Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M5.56523 13.685C5.33523 12.995 5.20455 12.2579 5.20455 11.5C5.20455 10.742 5.33523 10.005 5.56523 9.31499V6.33545H1.72318C0.944318 7.88795 0.5 9.64431 0.5 11.5C0.5 13.3557 0.944318 15.112 1.72318 16.6645L5.56523 13.685Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.9995 4.57386C13.6879 4.57386 15.2038 5.15409 16.3956 6.29364L19.694 2.99523C17.7024 1.13955 15.0992 0 11.9995 0C7.50402 0 3.61493 2.57705 1.72266 6.33545L5.5647 9.315C6.46902 6.59682 9.00425 4.57386 11.9995 4.57386Z" fill="white"/>
</svg>

    );
};

Google.displayName = 'Google';
