import { createContext } from 'react';

import type { DatePickerProps } from '.';

export const DatePickerContext = createContext<DatePickerProps | null>(null);