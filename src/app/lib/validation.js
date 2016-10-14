export default {
  VALID_MOBILE: /(\+614|04)[0-9]{8}/,
  VALID_USERNAME: /^[a-z0-9][a-z0-9_-]{1,14}[a-z0-9]$/,
  INVALID_USERNAME: /[_-]{2}/g,
  VALID_PASSWORD: /.{8,64}/,
};
