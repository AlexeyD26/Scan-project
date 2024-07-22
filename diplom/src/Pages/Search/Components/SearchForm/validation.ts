import { Errors } from './types';
import moment from 'moment';

const NUMBERS_REGEX = /^\d+$/;

export const validateInn = (inn: string) => {
  const errors: Errors = {};

  if (inn.length !== 10 || !NUMBERS_REGEX.test(inn) || !inn.length) {
    errors.inn = 'Введите корректные данные';
  }
  if (inn.length === 0) {
    errors.inn = 'Обязательное поле';
  }
  return errors;
};

export const validateDocs = (docs: string) => {
  const errors: Errors = {};
  const docsNumber = parseInt(docs, 10);

  if (isNaN(docsNumber) || docsNumber < 1 || docsNumber > 1000) {
    errors.docs = 'Введите значение от 1 до 1000';
  }
  if (docs.length === 0) {
    errors.docs = 'Обязательное поле';
  }

  return errors;
};

export const validateDates = (startDate: Date | null, endDate: Date | null) => {
  const errors: Errors = {};

  if (!startDate || !endDate) {
    errors.dates = 'Обязательное поле';
  }

  const now = moment();
  const start = moment(startDate);
  const end = moment(endDate);

  if (end < start) {
    errors.dates = 'Введите корректные данные';
  }

  if (start > now || end > now) {
    errors.dates = 'Введите корректные данные';
  }

  return errors;
};
