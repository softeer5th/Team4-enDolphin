import type { PropsWithChildren } from 'react';

import { containerStyle } from './index.css';

const MainLayout = ({ children }: PropsWithChildren) => (
  <main className={containerStyle}>
    {children}
  </main>
);

export default MainLayout;
