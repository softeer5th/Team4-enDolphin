import { WEEK_MAP } from '@/constants/date';

import { formatDateToWeek } from '.';

// TODO: 테스트 파일의 경우 max-len만 해제
// eslint-disable-next-line
describe('formatDateToWeek 함수', ()=>{
  describe('1일이 금, 토, 일요일인 경우', ()=>{
    describe('1일이 토요일인 경우', ()=>{
      test('1일은 전 달 마지막 주차로 판단한다.', () => {
        const { month, week } = formatDateToWeek(new Date('2025-02-01'));
        expect(month).toBe(1);
        expect(week).toBe(WEEK_MAP[5]);
      });
      test('2일은 전 달 마지막 주차로 판단한다.', ()=> {
        const { month, week } = formatDateToWeek(new Date('2025-02-02'));
        expect(month).toBe(1);
        expect(week).toBe(WEEK_MAP[5]);
      });
      test('3일은 이번 달 첫번쨰 주차로 판단한다.', ()=> {
        const { month, week } = formatDateToWeek(new Date('2025-02-03'));
        expect(month).toBe(2);
        expect(week).toBe(WEEK_MAP[1]);
      });
      test.each(['27', '28', '29', '30', '31'])(
        '전 달의 마지막 주차는 그대로 판단한다.', (date)=> {
          const { month, week } = formatDateToWeek(new Date(`2025-01-${date}`));
          expect(month).toBe(1);
          expect(week).toBe(WEEK_MAP[5]);
        });
    }); 
  });
  describe('1일이 월, 화, 수, 목요일인 경우', ()=>{
    describe('1일이 목요일인 경우', ()=>{
      test('전 달의 마지막 주차는 이번 달의 첫째주로 판단한다.', ()=>{
        const { month, week } = formatDateToWeek(new Date('2024-07-31'));
        expect(month).toBe(8);
        expect(week).toBe(WEEK_MAP[1]);
      });
      test('1일은 첫째주로 판단한다.', ()=> {
        const { month, week } = formatDateToWeek(new Date('2024-08-01'));
        expect(month).toBe(8);
        expect(week).toBe(WEEK_MAP[1]);
      });
      test('2일은 첫째주로 판단한다.', ()=> {
        const { month, week } = formatDateToWeek(new Date('2024-08-02'));
        expect(month).toBe(8);
        expect(week).toBe(WEEK_MAP[1]);
      });
    });
  });
});