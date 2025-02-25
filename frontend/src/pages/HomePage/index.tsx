
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import FinishedSchedules from '@/features/shared-schedule/ui/FinishedSchedules';
import OngoingSchedules from '@/features/shared-schedule/ui/OngoingSchedules';
import { checkboxAtom } from '@/store/discussion';

import { containerStyle } from './index.css';
import UpcomingSection from './UpcomingSection';

const HomePage = () => {
  const setCheckbox = useSetAtom(checkboxAtom);
  useEffect(() => {
    setCheckbox(null);
  }, [setCheckbox]);

  return (
    <div className={containerStyle}>
      <UpcomingSection />
      <OngoingSchedules />
      <FinishedSchedules />
    </div>
  );
};

export default HomePage;