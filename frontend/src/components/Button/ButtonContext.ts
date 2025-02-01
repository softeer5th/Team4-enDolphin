import { createContext } from 'react';

import type { ButtonProps } from '.';

interface ButtonContextProps {
  size: ButtonProps['size'];
}

export const ButtonContext = createContext<ButtonContextProps | null>(null);
