/**
 * 날짜 객체를 YY-MM-DD 형식의 문자열로 변환합니다.
 * @param date - 날짜 객체
 * @returns 
 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};