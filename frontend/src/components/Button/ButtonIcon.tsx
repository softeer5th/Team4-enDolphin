import React from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { ButtonContext } from './ButtonContext';
import { ButtonIconContainerStyle } from './buttonIcon.css';

const ButtonIcon = ({ children }: { children: React.JSX.Element }) => {
  // TODO: size='sm' 일 때 아이콘의 삽입 가능 여부와 그때의 크기 논의
  const { size } = useSafeContext(ButtonContext);
  const widthMap = {
    sm: 16,
    md: 16,
    lg: 16,
    xl: 16,
  };
  return (
    <div className={ButtonIconContainerStyle({ size })}>
      <children.type {...children.props} width={widthMap[size]}/>
    </div>
  );
};

export default ButtonIcon;