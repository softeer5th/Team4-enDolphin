
import type { HighlightProps } from '.';
import { highlightBoxStyle } from './index.css';

const HighlightBox = ({ highlightState, children }: HighlightProps) => (
  <div className={highlightBoxStyle({ highlightState })}>
    {children}
  </div>
);

export default HighlightBox;