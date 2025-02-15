import CandidateScheduleDetail from '@/features/candidate-schedule/ui';

import { backdropStyle } from './index.css';

const CandidateSchedulePage = () => (
  <>
    <div className={backdropStyle} />
    <CandidateScheduleDetail />
  </>
);

export default CandidateSchedulePage;