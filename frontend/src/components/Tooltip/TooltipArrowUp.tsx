   
export const TooltipArrowUp = ({ fill }: { fill: string }) => (
  <svg fill='none' height='9' viewBox='0 0 15 9' width='15' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_b_765_1187)'>
      <path d='M5.86153 1.34066C6.65774 0.203231 8.34226 0.203229
      9.13846 1.34066L14.5 9H0.5L5.86153 1.34066Z' fill={fill}/>
    </g>
    <defs>
      <filter 
        color-interpolation-filters='sRGB' 
        filterUnits='userSpaceOnUse' 
        height='18.5125' 
        id='filter0_b_765_1187' 
        width='24' 
        x='-4.5' 
        y='-4.51245'>
        <feFlood flood-opacity='0' result='BackgroundImageFix'/>
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='2.5'/>
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_765_1187'/>
        <feBlend 
          in='SourceGraphic' 
          in2='effect1_backgroundBlur_765_1187' 
          mode='normal' 
          result='shape'/>
      </filter>
    </defs>
  </svg>
);

TooltipArrowUp.displayName = 'TooltipArrowUp';
