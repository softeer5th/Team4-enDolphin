   
import type { IconProps } from '../Icon.d.ts';

export const ChevronRight = ({ clickable = false, className, width = 24 , fill = "white", ...rest }: IconProps) => {
    return (
        <svg width={width} height={width} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" aria-label="chevron-right icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>
<path d="M15.7057 11.6107C16.0963 12 16.0977 12.6307 15.7097 13.0227L11.0717 17.704C10.8763 17.9013 10.619 18 10.3617 18C10.107 18 9.85233 17.9033 9.65766 17.71C9.265 17.3213 9.263 16.6887 9.65166 16.296L13.5877 12.3227L9.62706 8.37466C9.2364 7.98532 9.23506 7.35192 9.62506 6.96066C10.0144 6.56932 10.6491 6.56866 11.0391 6.95866L15.7057 11.6107Z" fill={fill}/>
</svg>

    );
};

ChevronRight.displayName = 'ChevronRight';
