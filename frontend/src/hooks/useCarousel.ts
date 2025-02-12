import type { RefObject } from 'react';
import { useState } from 'react';

const CARD_WIDTH = 358;    // 실제 카드 한 장의 너비(디자인에 맞게)
const GAP = 24;            // 카드 사이 간격(위 예시는 vars.spacing[600]과 일치한다고 가정)
const CARDS_PER_MOVE = 3;  // 한번 이동할 때 옮길 카드 개수

interface UseCarouselControlProps {
  trackRef: RefObject<HTMLDivElement | null>;
}

export const useCarouselControl = ({ trackRef }: UseCarouselControlProps) => {
  const [offsetX, setOffsetX] = useState(0);

  const translateCarousel = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;

    // 1) 한 번에 이동할 거리
    const step = CARDS_PER_MOVE * (CARD_WIDTH + GAP);

    // 2) 트랙 전체 너비 vs 뷰포트(=carouselStyle) 너비 계산
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = trackRef.current.offsetParent
      ? (trackRef.current.offsetParent as HTMLElement).offsetWidth
      : 0;

    // startPosX = 0
    // endPosX = -(트랙전체너비 - 뷰포트너비) (음수 값)
    const maxOffsetX = -(trackWidth - viewportWidth);

    let newOffsetX = offsetX;

    if (direction === 'left') {
      newOffsetX += step; // 오른쪽으로 이동할 때는 offsetX가 증가(왼쪽으로 밀림)
      if (newOffsetX > 0) {
        newOffsetX = 0; // 더 이상 왼쪽으로 못 가게 0으로
      }
    } else {
      newOffsetX -= step; // 왼쪽으로 이동할 때는 offsetX가 감소(오른쪽으로 밀림)
      if (newOffsetX < maxOffsetX) {
        newOffsetX = maxOffsetX; // 더 이상 오른쪽으로 못 가게 maxOffsetX로
      }
    }

    setOffsetX(newOffsetX);
  };

  return { offsetX, translateCarousel };
};