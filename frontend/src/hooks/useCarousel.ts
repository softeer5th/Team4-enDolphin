import { useState } from 'react';

const CARD_WIDTH = 358;      // 카드 너비 (디자인에 맞게 설정)
const CARD_GAP = 24;         // 카드 사이 간격
const CARDS_PER_MOVE = 3;    // 한 번에 넘길 카드 수

interface UseCarouselControlProps {
  totalCards: number;        // 전체 카드 수
  initialIndex?: number;     // 시작 카드 인덱스 (0부터 totalCards-1)
  cardsPerMove?: number;     // 한 번에 넘길 카드 수
  cardGap?: number;          // 카드 사이 간격
  cardWidth?: number;        // 카드 너비
}

export const useCarouselControl = ({
  totalCards,
  initialIndex = 0,
  cardsPerMove = CARDS_PER_MOVE,
  cardGap = CARD_GAP,
  cardWidth = CARD_WIDTH,
}: UseCarouselControlProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(initialIndex);

  const offsetX = -currentCardIndex * (cardWidth + cardGap);

  const maxIndex = totalCards - cardsPerMove;

  const translateCarousel = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentCardIndex((prevIndex) =>
        Math.max(prevIndex - cardsPerMove, 0),
      );
    } else {
      setCurrentCardIndex((prevIndex) =>
        Math.min(prevIndex + cardsPerMove, maxIndex),
      );
    }
  };

  const canTranslateLeft = currentCardIndex > 0;
  const canTranslateRight = currentCardIndex < maxIndex;

  return {
    offsetX,
    translateCarousel,
    canTranslateLeft,
    canTranslateRight,
  };
};
