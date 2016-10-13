import moment from 'moment';


moment.locale('en-au');

export default moment;

export function toISOString(timestamp) {
  return moment(timestamp).toISOString();
}

export function formatTimestamp(timestamp, now) {
  const time = moment(timestamp);
  const reference = moment(now);

  if (time.diff(reference, 'hours') < 2) {
    return time.from(reference);
  }
  return time.calendar(reference);
}
