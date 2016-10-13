import { toISOString } from 'app/lib/moment';


export const SET_TIME = 'SET_TIME';

export function setTime() {
  return {
    type: SET_TIME,
    timestamp: toISOString(new Date()),
  };
}
