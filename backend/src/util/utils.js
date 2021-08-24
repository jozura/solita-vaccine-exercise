import moment from 'moment';
import { HttpException } from '../middleware/HttpException.js';

export const toMoment = (string) => {
  const t = moment(string);
  if (!t.isValid()) {
    throw new HttpException(400, 'Bad Request');
  };
  
  return t;
}

export const toNumber = (string) => {
  const n = Number(string);
  if (isNaN(n) || n < 0) {
    throw new HttpException(400, 'Bad Request');
  };
  
  return n;
}

