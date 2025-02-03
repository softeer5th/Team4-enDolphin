import { WEEK_MAP } from '@/constants/date';

import { formatDateToWeek } from '.';

describe('formatDateToWeek 함수', ()=>{
  describe('1일이 금, 토, 일요일인 경우', ()=>{
    describe('1일이 토요일인 경우', ()=>{
      test('1일은 전 달 마지막 주차로 판단한다.', ()=> {
        const { week } = formatDateToWeek(new Date('2025-02-01'));
        expect(week).toBe(WEEK_MAP[5]);
      });
      test('2일은 전 달 마지막 주차로 판단한다.', ()=> {
        const { week } = formatDateToWeek(new Date('2025-02-02'));
        expect(week).toBe(WEEK_MAP[5]);
      });
    });
  });
});