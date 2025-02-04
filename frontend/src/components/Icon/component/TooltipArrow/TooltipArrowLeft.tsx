export const TooltipArrowLeft = ({ fill }: { fill: string }) => (
  <svg fill='none' height='15' viewBox='0 0 9 15' width='9' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_b_765_1124)'>
      <path d='M1.34066 9.13847C0.203231 8.34226 0.203229 6.65774 
      1.34066 5.86154L9 0.499999L9 14.5L1.34066 9.13847Z' fill={fill}/>
    </g>
    <defs>
      <filter 
        colorInterpolationFilters='sRGB' 
        filterUnits='userSpaceOnUse' 
        height='24'
        id='filter0_b_765_1124' 
        width='18.5124'
        x='-4.51242'
        y='-4.5'>
        <feFlood floodOpacity='0' result='BackgroundImageFix'/>
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='2.5'/>
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_765_1124'/>
        <feBlend 
          in='SourceGraphic' 
          in2='effect1_backgroundBlur_765_1124' 
          mode='normal' 
          result='shape'/>
      </filter>
    </defs>
  </svg>

);

TooltipArrowLeft.displayName = 'TooltipArrowLeft';
