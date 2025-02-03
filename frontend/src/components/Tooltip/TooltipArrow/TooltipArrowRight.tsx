export const TooltipArrowRight = ({ fill }: {  fill: string }) => (
  <svg fill='none' height='15' viewBox='0 0 9 15' width='9' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_b_765_975)'>
      <path d='M7.65933 5.86153C8.79677 6.65774 8.79677 8.34226
       7.65934 9.13846L-6.11959e-07 14.5L0 0.5L7.65933 5.86153Z' fill={fill}/>
    </g>
    <defs>
      <filter 
        colorInterpolationFilters='sRGB' 
        filterUnits='userSpaceOnUse' 
        height='24' 
        id='filter0_b_765_975' 
        width='18.5124' 
        x='-5' 
        y='-4.5'>
        <feFlood floodOpacity='0' result='BackgroundImageFix'/>
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='2.5'/>
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_765_975'/>
        <feBlend 
          in='SourceGraphic' 
          in2='effect1_backgroundBlur_765_975' 
          mode='normal' 
          result='shape'/>
      </filter>
    </defs>
  </svg>

);

TooltipArrowRight.displayName = 'TooltipArrowRight';
