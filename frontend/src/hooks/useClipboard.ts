import { addNoti } from '@/store/global/notification';

export const useClipboard = () => {
  const handleCopyToClipboard = async (text: string) => {
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