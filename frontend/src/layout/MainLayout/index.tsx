import type { PropsWithChildren } from 'react';

import { containerStyle, contentWrapperStyle } from './index.css';

const MainLayout = ({ children }: PropsWithChildren) => (
  <main className={containerStyle}>
    <div className={contentWrapperStyle}>
      {children}
    </div>
  </main>
);

export default MainLayout;
