import { WEEK_MAP } from '@/constants/date';

import { formatDateToWeek } from '.';

// TODO: 테스트 파일의 경우 max-len만 해제
// eslint-disable-next-line
describe('formatDateToWeek 함수', ()=>{
  describe('1일이 금, 토, 일요일인 경우', ()=>{
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
    test.each(['3', '4', '5', '6', '7', '8', '9'])('2월 %s일은 첫번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2025-02-${date}`));
      expect(month).toBe(2);
      expect(week).toBe(WEEK_MAP[1]);
    });
    test.each(['10', '11', '12', '13', '14', '15', '16'])('2월 %s일은 두번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2025-02-${date}`));
      expect(month).toBe(2);
      expect(week).toBe(WEEK_MAP[2]);
    });
    test.each(['17', '18', '19', '20', '21', '22', '23'])('2월 %s일은 세번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2025-02-${date}`));
      expect(month).toBe(2);
      expect(week).toBe(WEEK_MAP[3]);
    });
    test.each(['24', '25', '26', '27', '28'])('2월 %s일은 네번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2025-02-${date}`));
      expect(month).toBe(2);
      expect(week).toBe(WEEK_MAP[4]);
    });
    test.each(['27', '28', '29', '30', '31'])(
      '전 달의 마지막 주차는 그대로 판단한다.', (date)=> {
        const { month, week } = formatDateToWeek(new Date(`2025-01-${date}`));
        expect(month).toBe(1);
        expect(week).toBe(WEEK_MAP[5]);
      });
  }); 
  describe('1일이 월, 화, 수, 목요일인 경우', ()=>{
    test('전 달의 마지막 주차는 이번 달의 첫째주로 판단한다.', ()=>{
      const { month, week } = formatDateToWeek(new Date('2024-07-31'));
      expect(month).toBe(8);
      expect(week).toBe(WEEK_MAP[1]);
    });
    test.each(['1', '2', '3', '4'])('8월 %s일은 첫번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2024-08-${date}`));
      expect(month).toBe(8);
      expect(week).toBe(WEEK_MAP[1]);
    });
    test.each(['5', '6', '7', '8', '9', '10', '11'])('8월 %s일은 두번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2024-08-${date}`));
      expect(month).toBe(8);
      expect(week).toBe(WEEK_MAP[2]);
    });
    test.each(['12', '13', '14', '15', '16', '17', '18'])('8월 %s일은 세번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2024-08-${date}`));
      expect(month).toBe(8);
      expect(week).toBe(WEEK_MAP[3]);
    });
    test.each(['19', '20', '21', '22', '23', '24', '25'])('8월 %s일은 네번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2024-08-${date}`));
      expect(month).toBe(8);
      expect(week).toBe(WEEK_MAP[4]);
    });
    test.each(['26', '27', '28', '29', '30', '31'])('8월 %s일은 다섯번째 주', (date)=> {
      const { month, week } = formatDateToWeek(new Date(`2024-08-${date}`));
      expect(month).toBe(8);
      expect(week).toBe(WEEK_MAP[5]);
    });
  });
});
