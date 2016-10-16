export default function requireLogin({ getState }) {
  if (__SERVER__) {
    return (nextState, replace) => {
      replace({
        pathname: '/login',
        query: {
          redirect: nextState.location.pathname,
        },
      });
    };
  }

  return (nextState, replace) => {
    if (!getState().users.token) {
      replace({
        pathname: '/login',
        query: {
          redirect: nextState.location.pathname,
        },
      });
    }
  };
}
