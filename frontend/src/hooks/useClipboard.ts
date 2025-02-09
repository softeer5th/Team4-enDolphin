import { NotificationContext } from '@/components/Notification/NotificationContext';

import { useSafeContext } from './useSafeContext';

export const useClipboard = () => {
  const { addNoti } = useSafeContext(NotificationContext);
  const handleCopyToClipboard = async (text: string) => {
    // TODO: 노티피케이션 다루는 공통 로직
    try {
      await navigator.clipboard.writeText(text);
      addNoti({
        title: '링크 복사가 완료됐어요',
        type: 'success',
      });
    } catch (error) {
      addNoti({
        title: '링크 복사에 실패했어요',
        type: 'error',
      });
    }
  };

  return { handleCopyToClipboard };
};