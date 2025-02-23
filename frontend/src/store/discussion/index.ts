import { atom } from 'jotai';

export const checkboxAtom = atom<number[]>([]);
export const tabAtom = atom<'calendar' | 'rank'>('calendar');
export const segmentAtom = atom<'participant' | 'time'>('participant');