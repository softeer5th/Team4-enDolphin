import type { RefObject } from 'react';
import { useMemo, useState } from 'react';

const CARD_WIDTH = 358;      // 카드 너비 (디자인에 맞게 설정)
const CARD_GAP = 24;         // 카드 사이 간격
const CARDS_PER_MOVE = 3;    // 한 번에 넘길 카드 수

interface UseCarouselControlProps {
  trackRef: RefObject<HTMLDivElement | null>;
  totalCards: number;        // 전체 카드 수
  baseLeftOffset?: number;   // 왼쪽 여백 (기본값 0)
  baseRightOffset?: number;  // 오른쪽 여백 (기본값 0)
  initialIndex?: number;     // 시작 카드 인덱스 (0부터 totalCards-1)
  cardsPerMove?: number;     // 한 번에 넘길 카드 수
  cardGap?: number;          // 카드 사이 간격
  cardWidth?: number;        // 카드 너비
}

/**
 * trackRef를 통해 트랙 전체 너비, 뷰포트 너비, 최대 offsetX를 계산하는 헬퍼 함수  
 * (오른쪽 여백(baseRightOffset)을 고려)
 */
const getTrackMetrics = (
  trackRef: RefObject<HTMLDivElement | null>,
  baseRightOffset: number,
) => {
  if (!trackRef.current) {
    return { trackWidth: 0, viewportWidth: 0, maxOffsetX: 0 };
  }
  const trackWidth = trackRef.current.scrollWidth;
  const viewportWidth = trackRef.current.offsetParent
    ? (trackRef.current.offsetParent as HTMLElement).offsetWidth
    : 0;
  // 최대 이동 범위: 트랙의 오른쪽 끝이 컨테이너의 오른쪽 여백(baseRightOffset) 위치에 맞도록  
  const maxOffsetX = (viewportWidth - baseRightOffset) - trackWidth;
  return { trackWidth, viewportWidth, maxOffsetX };
};

/**
 * 현재 offsetX와 이동 방향, 최대 offsetX, 그리고 왼쪽 여백(baseLeftOffset)을 고려하여  
 * 새로운 offsetX를 계산하는 헬퍼 함수  
 * (allowed offsetX의 범위는 [maxOffsetX, baseLeftOffset] 입니다)
 */
const calculateNewOffsetX = (
  step: number,
  currentOffset: number,
  direction: 'left' | 'right',
  maxOffsetX: number,
  baseLeftOffset: number,
): number => {
  if (direction === 'left') {
    // 왼쪽 이동: 현재 offsetX가 baseLeftOffset까지 얼마 남았는지 계산  
    const distanceToLeftBoundary = baseLeftOffset - currentOffset;
    const actualStep = distanceToLeftBoundary < step ? distanceToLeftBoundary : step;
    return currentOffset + actualStep;
  } else {
    // 오른쪽 이동: 현재 offsetX와 maxOffsetX 사이의 남은 거리를 계산  
    const distanceToRightBoundary = currentOffset - maxOffsetX;
    const actualStep = distanceToRightBoundary < step ? distanceToRightBoundary : step;
    return currentOffset - actualStep;
  }
};

export const useCarouselControl = ({
  totalCards, trackRef,
  baseLeftOffset = 0,
  baseRightOffset = 0,
  initialIndex = 0,
  cardsPerMove = CARDS_PER_MOVE,
  cardGap = CARD_GAP,
  cardWidth = CARD_WIDTH,
}: UseCarouselControlProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(initialIndex);
  const [offsetX, setOffsetX] = useState(
    baseLeftOffset - initialIndex * (cardWidth + cardGap),
  );

  const step = (cardWidth + cardGap) * cardsPerMove;

  const { canTranslateLeft, canTranslateRight } = useMemo(() => {
    const canTranslateLeft = currentCardIndex > 0;
    const canTranslateRight = currentCardIndex < totalCards - 1;
    return { canTranslateLeft, canTranslateRight };
  }, [currentCardIndex, totalCards]);

  const translateCarousel = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;

    const { maxOffsetX } = getTrackMetrics(trackRef, baseRightOffset);
    const newOffsetX = calculateNewOffsetX(step, offsetX, direction, maxOffsetX, baseLeftOffset);
    // 새로운 인덱스는 offsetX가 baseLeftOffset에서 얼마나 떨어졌는지로 계산  
    const newIndex = Math.round((baseLeftOffset - newOffsetX) / (cardWidth + cardGap));
    setCurrentCardIndex(newIndex);
    setOffsetX(newOffsetX);
  };

  return {
    offsetX,
    translateCarousel,
    canTranslateLeft,
    canTranslateRight,
  };
};
