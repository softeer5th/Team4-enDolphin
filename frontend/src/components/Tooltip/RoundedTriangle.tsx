import React from 'react';

import {
  bottomRightTriangle,
  lowerTriangle,
  triangleContainer,
  trianglePart,
  upperTriangle,
} from './roundedTriangle.css';

interface RoundedTriangleProps {
  color: 'blue' | 'black';
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

export const RoundedTriangle: React.FC<RoundedTriangleProps> = ({
  color,
  direction = 'top',
}) => (
  <div className={triangleContainer({ direction })}>
    <div className={`${trianglePart({ color })} ${upperTriangle}`} />
    <div className={`${trianglePart({ color })} ${lowerTriangle}`} />
    <div className={`${trianglePart({ color })} ${bottomRightTriangle}`} />
  </div>
);
