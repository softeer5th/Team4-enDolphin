export const TooltipArrowDown = ({ fill }: { fill: string }) => (
  <svg fill='none' height='9' viewBox='0 0 15 9' width='15' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_b_765_1178)'>
      <path d='M9.13847 7.65933C8.34226 8.79677 6.65774 8.79677 
        5.86154 7.65934L0.5 -1.22392e-06L14.5 0L9.13847 7.65933Z' fill={fill}/>
    </g>
    <defs>
      <filter 
        colorInterpolationFilters='sRGB' 
        filterUnits='userSpaceOnUse' 
        height='18.5125' 
        id='filter0_b_765_1178' 
        width='24' 
        x='-4.5' 
        y='-5'>
        <feFlood floodOpacity='0' result='BackgroundImageFix'/>
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='2.5'/>
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_765_1178'/>
        <feBlend 
          in='SourceGraphic' 
          in2='effect1_backgroundBlur_765_1178' 
          mode='normal' 
          result='shape'/>
      </filter>
    </defs>
  </svg>
);

TooltipArrowDown.displayName = 'TooltipArrowDown';
