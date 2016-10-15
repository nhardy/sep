export const VALID_MOBILE = '(\\+614|04)[0-9]{8}';
export const VALID_USERNAME = '^[a-z0-9][a-z0-9_-]{1,14}[a-z0-9]$';
export const VALID_PASSWORD = '.{8,64}';

export const VALID_PASSWORD_REGEX = new RegExp(VALID_PASSWORD);
export const VALID_MOBILE_REGEX = new RegExp(VALID_MOBILE);
export const VALID_USERNAME_REGEX = new RegExp(VALID_USERNAME);
