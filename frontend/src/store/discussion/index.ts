import { atom } from 'jotai';

export const checkboxAtom = atom<number[] | null>(null);
export const tabAtom = atom<'calendar' | 'rank'>('rank');
export const segmentAtom = atom<'participant' | 'time'>('participant');