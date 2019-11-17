import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Converts a date to a relative string from now.
 * @param date The date to convert.
 */
export function relativeFromNow(date: Date): string {
    return dayjs(date).fromNow();
}