//import dayjs from "dayjs";
import { format, isSameDay, isSameWeek, parseISO } from 'date-fns';
import { kebabCase } from 'lodash';

export const formatFileName = (name: string) => {
  const splitted = name.split('.');

  const extension = splitted.slice(-1)[0];
  const baseName = splitted.slice(0, -1).join('.');

  return `${Date.now()}-${kebabCase(
    baseName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D'),
  )}.${extension}`;
};

export const formatFileSize = (size: number) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, i)).toFixed(1)} ${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
};

export const formatDate = (timestamp: Date) => {
  const date = parseISO(`${timestamp}`);
  const today = new Date();

  // https://date-fns.org/v2.3.0/docs/format
  if (isSameDay(date, today)) return format(date, 'p');

  if (isSameWeek(date, today)) return format(date, 'iii p');

  if (date.getFullYear() === today.getFullYear()) return format(date, 'MMM dd p');

  return format(date, 'Pp');
};

export const splitLinkFromMessage = (message: string) => {
  const URL_REGEX =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm;

  const result = message.split(' ').reduce((acc, item) => {
    const isURL = URL_REGEX.test(item);
    if (isURL) acc.push({ link: item });
    else {
      if (typeof acc.slice(-1)[0] === 'string') {
        acc = [...acc.slice(0, -1), `${acc.slice(-1)[0]} ${item}`];
      } else {
        acc.push(item);
      }
    }

    return acc;
  }, [] as ({ link: string } | string)[]);

  return result;
};
