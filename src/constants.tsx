export enum ExcerciseOptions {
  none = 'None',
  small = 'Light (up to 30m)',
  medium = 'Medium (up to 1h)',
  large = 'Heavy (more than 1h)',
};

export const VALIDATIONS = {
  float: {
    message: 'Needs to be a number with up two decimal places',
    value: /^[0-9]*\.?[0-9]{0,2}$/i,
  },
  rating: {
    message: 'Needs to a be number from 0-10',
    value: /^[0-9]{1,2}$/i,
  },
};

export const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  NAME_INVALID: 'Not a Valid Name',
  TERMS: 'Terms Must Be Accepted To Continue',
  EMAIL_INVALID: 'Not a Valid Email',
};
