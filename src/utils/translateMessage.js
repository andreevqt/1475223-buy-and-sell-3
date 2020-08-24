'use strict';
/* eslint-disable indent */

const translateMessage = ({context, type, message}) => {
  switch (type) {
    case `string.base`:
      return `"${context.label}" должно быть строкой`;
    case `string.min`:
      return `"${context.label}" должно быть не менее ${context.limit} символов`;
    case `array.base`:
      return `"${context.label}" должно быть массивом`;
    case `array.min`:
      return `"${context.label}" должен сожержать хотя бы ${context.limit} элемент`;
    case `any.required`:
      return `"${context.label}" требумое поле`;
    case `number.min`:
      return `"${context.label}" должно быть не меньше ${context.limit}`;
    case `number.max`:
      return `"${context.label}" должно быть не больше ${context.limit}`;
    default:
      return message;
  }
};

module.exports = translateMessage;
