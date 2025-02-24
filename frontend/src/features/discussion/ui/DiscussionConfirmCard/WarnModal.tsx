import Button from '@/components/Button';
import { Modal } from '@/components/Modal';
import type { ModalInfo } from '@/hooks/useModal';

import { modalFooterStyle } from './warnModal.css';

interface WarnModalProps extends ModalInfo {
  onConfirm: () => void;
} 

const WarnModal = ({ onConfirm, ...modalProps }: WarnModalProps) => (
  <Modal
    description={`참여자들의 캘린더에서 확정되었던 일정이 삭제됩니다.\n
      마감기한이 지났다면, 7일 연장해드릴게요!`}
    isOpen={modalProps.isOpen}
    subTitle='경고'
    title='일정 조율을 다시 진행하시겠습니까?'
    type='error'
  >
    <Modal.Footer className={modalFooterStyle}>
      <Button
        onClick={modalProps.onModalClose}
        size='xl'
        style='weak'
        variant='secondary'
      >
        취소
      </Button>
      <Button
        onClick={() => onConfirm()}
        size='xl'
        variant='re'
      >
        다시 진행하기
      </Button>
    </Modal.Footer>
  </Modal>
);

export default WarnModal;