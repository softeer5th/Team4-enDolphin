const isStartWithFirstWeek = (firstDay: Date) => {
  const day = firstDay.getDay();
  if (day === 5 || day == 6 || day === 0) return false;
  return true;
};

// TODO: 테스트 코드 추가, 겹치는 코드 리팩터링
const calcWeekNum = (date: Date) => {
  const weekMap: Record<string, string> = {
    1: '첫째주',
    2: '둘째주',
    3: '셋째주',
    4: '넷째주',
    5: '다섯째주',
  };

  const isFirstDay = date.getDate() === 1;
  if (isFirstDay && !isStartWithFirstWeek(date)) {
    const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
    const prevMonthLastDay = prevMonthLastDate.getDay();
    const daysInPrevMonth = prevMonthLastDate.getDate();

    const lastWeekDays = 7 - prevMonthLastDay;
    return Math.ceil((daysInPrevMonth - lastWeekDays + 7) / 7);
  }

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstWeekfirstDay = 
    isStartWithFirstWeek(date) ? firstDay.getDate() : firstDay.getDate() + 1;
  const week = Math.ceil((date.getDate() - firstWeekfirstDay + 7) / 7);

  return weekMap[week];
};

export const formatDateToWeek = (date: Date) => {
  const selected = new Date(date);
  const firstDateOfWeek = new Date(selected.setDate(selected.getDate() - selected.getDay())); 
  const year = date.getFullYear().toString();

  const dates = new Array(7).fill(0)
    .map((_, i)=>{
      const DAY = 60 * 60 * 24 * 1000;
      const date = new Date(firstDateOfWeek.getTime() + i * DAY);
      return date;
    });

  return {
    year: year.slice(2),
    month: date.getMonth() + 1,
    week: calcWeekNum(date),
    dates,
  };
};

export const isSameDate = (date1: Date, date2: Date): boolean => (
  date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
);