export default function requireUnauthenticated({ getState }) {
  if (__SERVER__) {
    return (nextState, replace) => {};  // eslint-disable-line no-unused-vars
  }

  return (nextState, replace) => {
    if (getState().users.token) {
      replace({
        pathname: '/',
      });
    }
  };
}
