import { isEmpty } from "lodash";
import {is} from 'is_ts';

export const formValidator = fields => {
  const errors = {};

  if (isEmpty(fields.loginField)) {
    errors.loginField = "Это обязательное поле!";
  }

  if (isEmpty(fields.passwordField)) {
    errors.passwordField = "Это обязательное поле!";
  }

  if(isEmpty(fields.newPasswordField)) {
    errors.newPasswordField = "Это обязательное поле!";
  }

  if(!isEmpty(fields.passwordField) && !isEmpty(fields.newPasswordField)) {
    if(fields.passwordField !== fields.newPasswordField) {
      errors.newPasswordField = 'Пароли не совпадают!';
    }
  }

  return errors;
};

export const length = len  => value  => {
  return value?.length < len
    ? `Номер телефона содержит ${len} цифр!`
    : null;
};

export const onlyEmail = value  => {
  if (is.email(value)) {
    return null;
  } else {
      return 'Некорректно указан email'
  }
};

export const passLength = len => value => {
  return value?.length < len
    ? `Минимальная длина пароля:  ${len}`
    : null;
};
